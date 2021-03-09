class Ds{
    app;
    data;
    event;
    defaultEvent = [
        {
            eventName       :'text',
            eventFunction   :function(txt){
                this.me.innerText = txt;
            }
        },
        {
            eventName       :'html',
            eventFunction   :function(subHtml){
                this.me.innerHTML = subHtml;
            }
        },
        {
            eventName       :'attr',
            eventFunction   :function(attributeName, attributeValue){
                this.me.setAttribute(attributeName, attributeValue);
            }
        }
    ];
    
    render(selector, arg){
        this.app = {
            children: document.querySelector('#'+selector).getElementsByTagName('*')
        };
        this.data = arg.data;
        this.event = arg.event;
        for (let i = 0; i < this.app.children.length; i++) {
            const el = this.app.children[i];
            this.initData(el);
        }
        for (let i = 0; i < this.app.children.length; i++) {
            const el = this.app.children[i];
            this.reRender(el);
        }
        if(this.event.init !== undefined){
            this.event.init.bind(this.data);
            this.event.init.call(this.data);
        }
    }
    refactorData(element, elData = {}){
        elData = {me:element, ...elData};
        for (let i = 0; i < this.defaultEvent.length; i++) {
            const event = this.defaultEvent[i];
            element[event.eventName] = event.eventFunction.bind(elData);
            console.log(event.eventName)
        }
        return elData;
    }
    initData(element) {
        this.refactorData(element);
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            const attrValue = attr.nodeValue;
            const attrValueClean = (attrValue[0] === '{' ? attrValue.substring(1,attrValue.length-1) : attrValue).trim();
            if(attr.name[0] == 'd'){
                if (attr.name == 'd-id') {
                    this.data[attrValueClean] = element;
                }else if(attr.name == 'd-if'){
                    (function(){
                        if(!eval(attrValueClean)){
                            element.remove();
                        }
                    }).bind(this.data)();
                }
            }
        }
    }
    reRender(element){
        var elData = this.refactorData(element, this.data);
        var attr_ = [...element.attributes];
        console.log(attr_);
        for (let i = 0; i < attr_.length; i++) {
            const attr = attr_[i];
            const attrValue = attr.nodeValue;
            const attrValueClean = attrValue.substring(1,attrValue.length-1).trim();
            if(attr.name[0] == '@'){
                const event = attr.name.substring(1);
                element.addEventListener(event, this.event[attrValueClean].bind(elData))
                element.removeAttribute(attr.name);
                console.log(attr.name);
            }
        }
    }
}
