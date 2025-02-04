const bkpObj = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};
const bkpMaxObj = {
  xs: 600,
  sm: 960,
  md: 1280,
  lg: 1920,
  xl: 999999,
};

export default class UI {
  static biggerThan(width, bkp) {
    return bkpObj[width] > bkpObj[bkp];
  }
  static smallerThan(width, bkp) {
    return bkpObj[width] < bkpObj[bkp];
  }
  static biggerThanEq(width, bkp) {
    return bkpObj[width] >= bkpObj[bkp];
  }
  static smallerThanEq(width, bkp) {
    return bkpObj[width] <= bkpObj[bkp];
  }
  static in(width, arr) {
    return arr.some((el) => el === width);
  }
  static between(width, min, max) {
    const val = bkpObj[width];
    const valMin = bkpObj[min];
    const valMax = bkpMaxObj[max];

    return valMin <= val && val < valMax;
  }
  static screenW = window.innerWidth;
  static screenH = window.innerHeight;

  static bkp = () => {
    const width = window.innerWidth;

    if (width >= bkpObj.xl) return "xl";
    if (width >= bkpObj.lg) return "lg";
    if (width >= bkpObj.md) return "md";
    if (width >= bkpObj.sm) return "sm";
    return "xs";
  };
  static all = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const bkp = this.bkp();
    const biggerThan = {
      xs: this.biggerThan(bkp, "xs"),
      sm: this.biggerThan(bkp, "sm"),
      md: this.biggerThan(bkp, "md"),
      lg: this.biggerThan(bkp, "lg"),
      xl: this.biggerThan(bkp, "xl"),
    };
    const biggerThanEq = {
      xs: this.biggerThanEq(bkp, "xs"),
      sm: this.biggerThanEq(bkp, "sm"),
      md: this.biggerThanEq(bkp, "md"),
      lg: this.biggerThanEq(bkp, "lg"),
      xl: this.biggerThanEq(bkp, "xl"),
    };
    const smallerThan = {
      xs: this.smallerThan(bkp, "xs"),
      sm: this.smallerThan(bkp, "sm"),
      md: this.smallerThan(bkp, "md"),
      lg: this.smallerThan(bkp, "lg"),
      xl: this.smallerThan(bkp, "xl"),
    };
    const smallerThanEq = {
      xs: this.smallerThanEq(bkp, "xs"),
      sm: this.smallerThanEq(bkp, "sm"),
      md: this.smallerThanEq(bkp, "md"),
      lg: this.smallerThanEq(bkp, "lg"),
      xl: this.smallerThanEq(bkp, "xl"),
    };

    return {
      width,
      height,
      bkp,
      biggerThan,
      biggerThanEq,
      smallerThan,
      smallerThanEq,
    };
  };

  static componentStatusAfterResizing = () => {
    // const bkp = this.bkp();

    return {
      rnbOpen: false,
      // rnbOpen: this.biggerThanEq(bkp, 'md'),
      lnbNavBar: false,
    };
  };
}
