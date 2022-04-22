# Pano template with KRPANO

## Creating panoramic view

1. Download actual version of krapno https://krpano.com/download/
2. Atcivate krpano with krpano Tools and your key.
3. Use droplets from krpano folder to create panorama:
- Drag the panorama image to the needed droplet (on the output you will get a folder with all the files - in the directory with your picture)
- Use generated ```pano.xml``` for customisation your panorama

## Including krpano library to your project

1. Use the source code from a file templates/krpano/pano.html for including krpano to your project.
2. Change link to your xml in pano.html 
```$xslt
embedpano({
xml:"https://i.loopme.me/html/%%WAY_TO_YOUR_PANO%%/pano.xml",
target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
```

## Customisation of your panorama

1. Add dots(hotspots) and a plugin for displaying information about dots(hotspots) from templates/krpano/pano.xml in your pano.xml
2. Move the hotspots and change the values in your pano.xml according to your need.
