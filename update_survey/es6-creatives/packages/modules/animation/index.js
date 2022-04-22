/**
*  const elem = document.getElementById('a')
*  const DURATION = 500;
*  animation({aTransformX: 0}, DURATION, {
*    aTransformX: 500,
*    onUpdate: ({aTransformX}) => elem.style.transform = `translateX(${aTransformX})`,
*    onComplete: props => console.log('Done!'),
*    ease: t => t<.5 ? 2*t*t : -1+(4-2*t)*t
*  })
*/

export default function animation(values, duration, options) {
    const lerp = (source, target, amount) => source + amount * (target - source);
    const checkNum = n => typeof n === 'number' ? n : null
    const checkFunc = f => typeof f === 'function' ? f : _ => _

    const onComplete = checkFunc(options.onComplete);
    const onUpdate = checkFunc(options.onUpdate);
    const ease = checkFunc(options.ease);
    const start = Date.now()

    const animationMap = Object.keys(values).reduce((map, key) => {
        const _from = checkNum(values[ key ])
        const _to = checkNum(options[ key ])
        if (_from !== null && _to !== null) map[ key ] = [ _from, _to ]
        return map
    }, {})

    const keys = Object.keys(animationMap)

    const animation = () => {
        const now = Date.now()
        let t = duration > 0 ? (now - start) / duration : 1

        keys.forEach(key => {
            const [ _from, _to ] = animationMap[ key ]
            const progress = ease(t, _from, _to, duration)
            values[ key ] = lerp(_from, _to, progress)
        })

        if (t >= 1) {
            keys.forEach(key => (values[ key ] = options[ key ]))
            onUpdate(values)
            onComplete(values)
        } else {
            onUpdate(values)
            requestAnimationFrame(animation)
        }
    }

    animation()
}
