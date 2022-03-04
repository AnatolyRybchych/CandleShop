window.onload = function (ev) {
    var elements = new HomePageElements();
    var footerBehavior = new FooterBehavivor(elements.Footer);
    footerBehavior.KeepBottomPos();
};
var HomePageElements = /** @class */ (function () {
    function HomePageElements() {
        this.FooterId = 'footer';
        this.Footer = document.getElementById(this.FooterId);
    }
    return HomePageElements;
}());
var FooterBehavivor = /** @class */ (function () {
    function FooterBehavivor(footer) {
        this.ElementBottomScreenClass = 'absolute_bottom';
        this.Footer = footer;
        this.Body = document.getElementsByTagName('body')[0];
        this.Window = document.getElementsByTagName('window')[0];
    }
    FooterBehavivor.prototype.KeepBottomPos = function () {
        var _this = this;
        console.log(this.Body.offsetHeight);
        console.log(window.innerHeight);
        this.KeepBottomPosHandle();
        this.Window.addEventListener('resize', function (ev) {
            _this.KeepBottomPosHandle();
        });
    };
    FooterBehavivor.prototype.KeepBottomPosHandle = function () {
        if (this.Body.offsetHeight < window.innerHeight)
            this.Footer.classList.add(this.ElementBottomScreenClass);
        else
            this.Footer.classList.remove(this.ElementBottomScreenClass);
    };
    return FooterBehavivor;
}());
