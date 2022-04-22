import './map.css';
import { getConfig, setState, sendCreativeEvent, first, convertToKm, sortByDistance, show, hide, isLoopMeSDK, isQR } from 'creative';

const mapContainer = first('.LM_map');
const showBtn = first('.LM_show_map_btn');
const hideBtn = first('.LM_hide_map_btn');
const mapHolder = first('#LM_map-holder');
const preloader = first('.LM_map .LM_map-preloader');
const storesList = first('.LM_stores-list');
const pinIcon = first('.LM_map-pin');

const API_KEY = 'AIzaSyAF1A1JX1A4xIBOsXAu9cKelshwkSA9Ut8';
const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=geometry`;

const MAP_DEFAULTS = {
    streetViewControl: false,
    mapTypeControl: false,
    zoom: 15,
    minZoom: 2
};

let pins = null;
let map = null;
let center;

const convertAddressToUrlFormat = ({ name, address, city, zip }) =>
    `${name} ${address} ${city} ${zip}`.replace(/\W/g, "+");

const storeToItem = ({ properties }, { lat, lng }) =>
    `<li data-click-url='https://www.google.com/maps/dir/?api=1&origin=${lat}+${lng}&destination=${convertAddressToUrlFormat(properties)}'>
        <p class='LM_store-name'>${properties.name}</p>
        <p class='LM_store-city'>${properties.city}</p>
        <p class='LM_store-address-wrapper'>
            <span class='LM_store-address'>${properties.address}</span>
            <span class='LM_store-state'>${properties.zip}</span>
        </p>
    </li>`;

const getPos = ([ lat, lng ]) => new google.maps.LatLng(lat, lng);
const toPos = ({ lat, lng }) => [ lat(), lng() ];

const calcStoresDistance = userPos => store => ({
    ...store,
    distance: convertToKm(google.maps.geometry.spherical.computeDistanceBetween(userPos, getPos(store.geometry.coordinates)))
});

const setStoresListByDistance = ({ features }, pos) => {
    const userPos = getPos(toPos(map.getCenter()));

    storesList.innerHTML = features
        .map(calcStoresDistance(userPos))
        .sort(sortByDistance)
        .map(el => storeToItem(el, pos))
        .join('');

    storesList.addEventListener('click', (event) => {
        sendCreativeEvent(getConfig().MAP_LIST_CLICK, 'INTERACTION');
        L.onClick(event.target.dataset.clickUrl);
    }, false);
};

const onMarkerClick = clickUrl => {
    sendCreativeEvent(getConfig().MAP_CLICK, 'INTERACTION');
    setState('isRedirected');

    L.onClick(clickUrl);
};

const renderMarker = (feature, id) => {
    const [ lng, lat ] = feature.geometry.coordinates;
    const marker = new google.maps.Marker({
        map,
        position: new google.maps.LatLng(lng, lat),
        id,
        icon: {
            url: pinIcon.src,
            scaledSize: new google.maps.Size(15, 21)
        }
    });

    const query = convertAddressToUrlFormat(feature.properties);
    const clickUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    google.maps.event.addListener(marker, 'click', () => onMarkerClick(clickUrl));
};

const renderMapWithMarkers = position => {
    const userMarker = new google.maps.Marker();

    userMarker.setMap(map);
    userMarker.setPosition(position);
    map.setCenter(position);

    pins.features.forEach(renderMarker);
};

const toLatLng = ({ coords: { latitude: lat, longitude: lng} }) => ({ lat, lng });

const renderMapData = coords => {
    hide(preloader);
    show(mapHolder);

    const position = toLatLng(coords);
    renderMapWithMarkers(position);
    setStoresListByDistance(pins, position);
};

const initMap = coords => {
    map = new google.maps.Map(mapHolder, { ...MAP_DEFAULTS, center: coords });

    if (isQR()) {
        const { DEFAULT_LAT, DEFAULT_LON } = getConfig();
        const [ lat, lng ] = [ parseFloat(DEFAULT_LAT), parseFloat(DEFAULT_LON) ];

        return renderMapData({ coords: { latitude: lat, longitude:  lng} });
    } else if (isLoopMeSDK) {
        return renderMapData(center);
    }

    navigator.geolocation.getCurrentPosition(renderMapData, () => renderMapData(center));
};

const showErrorMessage = () => {
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(`Error: Your browser doesn't support geolocation.`);
};

const checkGeolocation = () => {
    if (!navigator.geolocation) {
        return showErrorMessage();
    }
    const { USER_LAT, USER_LON } = getConfig();
    const [ lat, lng ] = [ parseFloat(USER_LAT), parseFloat(USER_LON) ];
    center = { coords: { latitude: lat, longitude:  lng} };

    return initMap({ lat, lng });
}

const loadMapScript = () => {
    const mapScript = document.createElement('script');

    mapScript.addEventListener('load', checkGeolocation, false);

    const showPreloader = () => show(preloader);
    mapScript.addEventListener('error', showPreloader, false);

    mapScript.src = API_URL;
    document.body.appendChild(mapScript);
};

const loadMarkers = url => fetch(url)
    .then(res => res.json())
    .then(markers => pins = markers)
    .then(loadMapScript);

const changeMapState = state => {
    if (state === 'show') {
        show(mapContainer);
        hide(showBtn);
    } else {
        show(showBtn);
        hide(mapContainer);
    }
};

const sendCloseMapEvent = () => sendCreativeEvent(getConfig().CLOSE_MAP, 'INTERACTION');

const loadMapMarkers = () => {
    loadMarkers(getConfig().MARKERS_URL);
    showBtn.removeEventListener('click', loadMapMarkers, false);
};

export const initMapListeners = () => {
    showBtn.addEventListener('click', () => changeMapState("show"), false);
    showBtn.addEventListener('click', loadMapMarkers, false);
    hideBtn.addEventListener('click', () => changeMapState("hide"), false);
    hideBtn.addEventListener('click', sendCloseMapEvent, false);
};
