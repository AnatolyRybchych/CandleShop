window.onload = (ev) => {
    var elements = new HomePageElements();
    var footerBehavior = new FooterBehavivor(elements.Footer);
    footerBehavior.KeepBottomPos();
};
class HomePageElements {
    constructor() {
        this.FooterId = 'footer';
        this.Footer = document.getElementById(this.FooterId);
    }
}
class FooterBehavivor {
    constructor(footer) {
        this.ElementBottomScreenClass = 'absolute_bottom';
        this.Footer = footer;
        this.Body = document.getElementsByTagName('body')[0];
    }
    KeepBottomPos() {
        console.log(this.Body.offsetHeight);
        console.log(window.innerHeight);
        this.KeepBottomPosHandle();
        window.addEventListener('resize', (ev) => {
            this.KeepBottomPosHandle();
        });
    }
    KeepBottomPosHandle() {
        if (this.Body.offsetHeight < window.innerHeight)
            this.Footer.classList.add(this.ElementBottomScreenClass);
        else
            this.Footer.classList.remove(this.ElementBottomScreenClass);
    }
}
