

window.onload = (ev) =>{
    var elements:HomePageElements = new HomePageElements();

    var footerBehavior:FooterBehavivor = new FooterBehavivor(elements.Footer); 
    
    


    footerBehavior.KeepBottomPos();
}

class HomePageElements{
    private readonly FooterId:string = 'footer';
    public readonly Footer:HTMLDivElement;

    constructor() {
        this.Footer = <HTMLDivElement>document.getElementById(this.FooterId);
    }
}

class FooterBehavivor{
    private readonly Footer:HTMLElement;
    private readonly Body:HTMLBodyElement;

    private readonly ElementBottomScreenClass:string = 'absolute_bottom';

    constructor(footer:HTMLElement) {
        this.Footer = footer;

        this.Body = <HTMLBodyElement>document.getElementsByTagName('body')[0];
    }

    public KeepBottomPos():void{
        console.log(this.Body.offsetHeight);
        console.log(window.innerHeight);

        this.KeepBottomPosHandle();
        window.addEventListener('resize', (ev:Event) =>{
            this.KeepBottomPosHandle();
        });
    }

    private KeepBottomPosHandle():void{
        if( this.Body.offsetHeight < window.innerHeight)
            this.Footer.classList.add(this.ElementBottomScreenClass);
        else
            this.Footer.classList.remove(this.ElementBottomScreenClass);
    }
}

