const withDefault = (value, defaultValue) => {
    if (value === null || value === undefined) return defaultValue;
    return value;
};

const AnalogBase = {
    background: s => s.theme.background,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '100%',
    border: s => `1px solid #2a70a0`,
    height: s => s.width,
    position: 'relative',
    width: s => s.width,
    marginRight:'auto',
    boxShadow:'0 2px 6px rgba(1, 1, 0, 0.26)'
};

const AnalogCenter = {
    background: s => s.theme.center,
    borderRadius: '100%',
    height: '12px',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    width: '12px',
};

const AnalogHand = {
    left: '50%',
    position: 'absolute',
    top: '50%',
    transformOrigin: '50% 100%',
};

const AnalogSecondHand = Object.assign({}, AnalogHand, {
    background: s => s.theme.seconds,
    height: s => Math.floor(s.width * 0.425),
    width:2,
});

const AnalogMinuteHand = Object.assign({}, AnalogHand, {
    background: s => s.theme.minutes,
    height: s => Math.floor(s.width * 0.35),
    width: 4,
});

const AnalogHourHand = Object.assign({}, AnalogHand, {
    background: s => s.theme.hour,
    height: s => Math.floor(s.width * 0.2),
    width:5,
});

const AnalogSmallTick = {
    background: s => s.theme.tick,
    height: 4,
    left: '51%',
    position: 'absolute',
    top: 3.5,
    transformOrigin: s => `0 ${Math.ceil(s.width / 2)}px`,
    width: s => withDefault(s.theme.smallTickWidth, 2),
};

const AnalogLargeTick = {
    background: s => s.theme.tick,
    height: 10,
    left: s => Math.ceil(s.width / 2) +0.5,
    position: 'absolute',
    top: 10,
    transformOrigin: s => `0 ${Math.ceil(s.width / 2)}px`,
    width: s => withDefault(s.theme.largeTickWidth, 4),
};

export default {
    base: AnalogBase,
    center: AnalogCenter,
    second: AnalogSecondHand,
    minute: AnalogMinuteHand,
    hour: AnalogHourHand,
    smallTick: AnalogSmallTick,
    largeTick: AnalogLargeTick,
};
