const template = document.createElement("template");

{
    let url = import.meta.url;
    let path = url.substring(0, url.lastIndexOf("/"))
    let response = await fetch(`${path}/XIconButton.html`);
    template.innerHTML = await response.text();
}

class XWidget extends HTMLElement {
    #icon;
    #form;
    #location;

    #margin;
    
    #pointerDown;
    #moving;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        this.#icon = this.#createIcon();
        shadowRoot.appendChild(this.#icon)

        this.#form = this.#createForm();
        shadowRoot.appendChild(this.#form);

        this.#margin = "20px";
        this.#pointerDown = false;
        this.#moving = false;
        this.#location = "bottom-right";
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        if (this.isConnected) {
            this.#renderIcon({width: "60px", height: "60px", imgSrc: this.#icon.openImgSrc});
            this.#renderForm({visibility: "hidden"});
        }
    }

    #createIcon() {
        let icon = document.createElement("div");

        icon.openImgSrc = "icon_open.png";
        icon.closeImgSrc = "icon_close.png";

        icon.addEventListener("pointerdown", (e) => this.#onIconPointerDown(e));
        icon.addEventListener("pointermove", (e) => this.#onIconPointerMove(e));
        icon.addEventListener("pointerup", (e) => this.#onIconPointerUp(e));
        icon.addEventListener("pointerover", (e) => this.#onIconPointerOver(e));
        icon.addEventListener("pointerout", (e) => this.#onIconPointerOut(e));

        let iconImage = document.createElement("img");
        iconImage.style.width = "100%";
        iconImage.style.height = "100%";
        icon.appendChild(iconImage)

        return icon;
    }

    #createForm() {
        let form = document.createElement("div");

        let header = document.createElement("div");
        header.id = "form-header";
        form.appendChild(header);

        let title = document.createElement("div");
        title.id = "form-title";
        header.appendChild(title);

        // let headerBottom = document.createElement("hr");
        // headerBottom.id = "form-header-bottom";
        // form.appendChild(headerBottom);

        // let nameInput = document.createElement("input");
        // nameInput.id = "name-input";
        // form.appendChild(nameInput);

        // let commentInput = document.createElement("textarea");
        // commentInput.id = "comment-input";
        // form.appendChild(commentInput);

        return form;
    }

    #renderIcon(parameters={}) {
        this.#icon.style.position = "fixed";
        this.#icon.style.transition = "scale 0.2s ease";

        if (parameters["width"]) {
            this.#icon.style.width = parameters["width"];
        }

        if (parameters["height"]) {
            this.#icon.style.height = parameters["height"];
        }

        if (parameters["scale"]) {
            this.#icon.style.scale = parameters["scale"];
        }

        if (parameters["imgSrc"]) {
            this.#icon.querySelector("img").src = parameters["imgSrc"];
        }

        if (this.#location == "top-left") {
            this.#icon.style.left = this.#margin;
            this.#icon.style.top = this.#margin;
            this.#icon.style.bottom = "auto";
            this.#icon.style.right = "auto";
        } else if (this.#location == "top-right") {
            this.#icon.style.left = "auto";
            this.#icon.style.top = this.#margin;
            this.#icon.style.bottom = "auto";
            this.#icon.style.right = this.#margin;
        } else if (this.#location == "bottom-left") {
            this.#icon.style.left = this.#margin;
            this.#icon.style.top = "auto";
            this.#icon.style.bottom = this.#margin;
            this.#icon.style.right = "auto";
        } else if (this.#location == "bottom-right") {
            this.#icon.style.left = "auto";
            this.#icon.style.top = "auto";
            this.#icon.style.bottom = this.#margin;
            this.#icon.style.right = this.#margin;
        }
    }

    #renderForm(parameters={}) {
        this.#form.style.width = "350px";
        this.#form.style.height = "500px";
        this.#form.style.backgroundColor = "white";
        this.#form.style.border = "0px";
        this.#form.style.borderRadius = "10px 10px 10px 10px"
        this.#form.style.boxShadow = "0 4px 16px rgb(0 0 0 / 25%)";
        this.#form.style.borderRadius = "15px";
        this.#form.style.position = "fixed";
        this.#form.style.opacity = "0";

        if (this.#location == "top-left") {
            this.#form.style.left = this.#margin;
            this.#form.style.top = this.#icon.clientHeight + 50 + "px";
            this.#form.style.bottom = "auto";
            this.#form.style.right = "auto";
        } else if (this.#location == "top-right") {
            this.#form.style.left = "auto";
            this.#form.style.top = this.#icon.clientHeight + 50 + "px";
            this.#form.style.bottom = "auto";
            this.#form.style.right = this.#margin;
        } else if (this.#location == "bottom-left") {
            this.#form.style.left = this.#margin;
            this.#form.style.top = "auto";
            this.#form.style.bottom = this.#icon.clientHeight + 50 + "px";
            this.#form.style.right = "auto";
        } else if (this.#location == "bottom-right") {
            this.#form.style.left = "auto";
            this.#form.style.top = "auto";
            this.#form.style.bottom = this.#icon.clientHeight + 50 + "px";
            this.#form.style.right = this.#margin;
        }

        if (parameters["visibility"]) {
            // This animation feels messy - especially since opacity is always declared above as 0
            if (parameters["visibility"] == "visible" && this.#form.style.visibility != "visible") {
                this.#form.style.visibility = "visible";

                if (parameters["animate"]) {
                    this.#form.style.opacity = "1";
                    this.#form.style.transition = "visibility 0s linear 0.1s, opacity 0.1s linear";
                    this.#form.style.transitionDelay = "0s";
                }
                else {
                    this.#form.style.transition = "";
                }
            }
            else if (parameters["visibility"] == "hidden" && this.#form.style.visibility != "hidden") {
                this.#form.style.visibility = "hidden";

                if (parameters["animate"]) {
                    this.#form.style.opacity = "0";
                    this.#form.style.transition = "visibility 0s linear 0.1s, opacity 0.1s linear";
                }
                else {
                    this.#form.style.transition = "";
                }
            }
        }

        let header = this.#form.querySelector("#form-header");
        header.style.top = "0px";
        header.style.width = "100%";
        header.style.height = "60px";
        header.style.backgroundColor = "#AE55E7";
        header.style.borderRadius = "15px 15px 0px 0px";
        header.style.border = "0px";
        header.style.justifyContent = "center";
        header.style.alignItems = "center";
        header.style.display = "flex";

        // let headerBottom = this.#form.querySelector("#form-header-bottom");
        // headerBottom.style.width = "100%";
        // headerBottom.style.height = "10px";
        // headerBottom.style.backgroundColor = "#AE55E7";
        // headerBottom.style.margin = "0px";
        // headerBottom.style.border = "0px";
        // headerBottom.style.boxShadow = "0 0 26px -2px rgba(0, 0, 0, 0.5)";
        // headerBottom.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 500%, 0% 500%)";

        let title = this.#form.querySelector("#form-title");
        title.textContent = "New Ticket";
        title.style.fontFamily = "Alexandria, sans-serif";
        title.style.fontWeight = "400";
        title.style.fontSize = "24px";
        title.style.color = "white";
        title.style.textAlign = "center";

        // let nameInput = this.#form.querySelector("#name-input");
        // nameInput.setAttribute("type", "text");
        // nameInput.setAttribute("placeholder", "Name");
        // nameInput.style.fontFamily = "Alexandria, sans-serif";
        // nameInput.style.fontWeight = "300";
        // nameInput.style.fontSize = "12px";

        // let commentInput = this.#form.querySelector("#comment-input");
        // commentInput.setAttribute("resize", "none");
        // commentInput.setAttribute("overflow-y", "scroll");
        // commentInput.setAttribute("rows", "15");
        // commentInput.setAttribute("cols", "30");
    }

    #onIconPointerOver(e) {
        e.preventDefault();
        e.stopPropagation();

        this.#renderIcon({scale: 1.05});
    }

    #onIconPointerOut(e) {
        e.preventDefault();
        e.stopPropagation();

        this.#renderIcon({scale: 1});
    }

    #onIconPointerDown(e) {
        e.preventDefault();
        e.stopPropagation();

        this.#pointerDown = true;

        this.#icon.setPointerCapture(e.pointerId);
    }

    #onIconPointerMove(e) {
        e.preventDefault();
        e.stopPropagation();

        this.#icon.style.cursor = "pointer";

        if (this.#pointerDown) {
            this.#moving = true;
            this.#icon.style.cursor = "grabbing";
            this.#snapToCorner(e.clientX, e.clientY);
        }
    }

    #onIconPointerUp(e) {
        e.preventDefault();
        e.stopPropagation();

        this.#icon.style.cursor = "pointer";

        if (!this.#moving) {
            if (this.#form.style.visibility == "visible") {
                this.#renderIcon({imgSrc: this.#icon.openImgSrc});
                this.#renderForm({visibility: "hidden", animate: true});
            } 
            else {
                this.#renderIcon({imgSrc: this.#icon.closeImgSrc});
                this.#renderForm({visibility: "visible", animate: true});
            }
        }
        else {
            this.#moving = false;
        }

        this.#pointerDown = false;

        this.#icon.releasePointerCapture(e.pointerId);
    }

    #toggleDisplayForm() {
        let visibility = 
            this.#form.style.visibility == "visible" ?
            "hidden" : "visible";

        this.#renderForm({visibility: visibility})
    }

    #snapToCorner(anchorX, anchorY) {
        let locationChanged = false;

        if (anchorX < window.innerWidth / 5) {
            if (this.#location != "top-left" && anchorY < window.innerHeight / 5) {
                this.#location = "top-left";
                locationChanged = true;
            }
            else if (this.#location != "bottom-left" && anchorY > window.innerHeight - window.innerHeight / 5) {
                this.#location = "bottom-left";
                locationChanged = true;
            }
        }
        else if (anchorX > window.innerWidth - window.innerWidth / 5) {
            if (this.#location != "top-right" &&  anchorY < window.innerHeight / 5) {
                this.#location = "top-right";
                locationChanged = true;
            }
            else if (this.#location != "bottom-right" && anchorY > window.innerHeight - window.innerHeight / 5) {
                this.#location = "bottom-right";
                locationChanged = true;
            }
        }

        if (locationChanged) {
            this.#renderIcon({imgSrc: this.#icon.openImgSrc});
            this.#renderForm({visibility: "hidden"});
        }
    }
}

customElements.define("x-widget", XWidget);
document.body.appendChild(document.createElement("x-widget"));