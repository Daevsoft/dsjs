class Ds{
    app;
    data;
    event;
    text(txt){
        this.me.innerText = txt;
    }
    render(selector, arg){
        this.app = document.getElementById(selector);
        this.data = arg.data;
        this.event = arg.event;
        
        for (let i = 0; i < this.app.children.length; i++) {
            const el = this.app.children[i];
            this.reRender(el);
        }
    }
    reRender(element){
        var elData = {...this.data};
        elData.me = element;
        element.text = this.text.bind(elData);
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            const attrValue = attr.nodeValue;
            const attrValueClean = attrValue.substring(1,attrValue.length-1);
            if(attr.name[0] == '@'){
                const event = attr.name.substring(1);
                element.addEventListener(event, this.event[attrValueClean].bind(elData))
            }
        }
    }
}