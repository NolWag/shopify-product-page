if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cartNotification = document.querySelector('cart-notification');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      this.cartNotification.setActiveElement(document.activeElement);

      const submitButton = this.querySelector('[type="submit"]');

      submitButton.setAttribute('disabled', true);
      submitButton.classList.add('loading');

      const body = JSON.stringify({
        ...JSON.parse(serializeForm(this.form)),
        sections: this.cartNotification.getSectionsToRender().map((section) => section.id),
        sections_url: window.location.pathname
      });

      fetch(`${routes.cart_add_url}`, { ...fetchConfig('javascript'), body })
        .then((response) => response.json())
        .then((parsedState) => {
          this.cartNotification.renderContents(parsedState);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          submitButton.classList.remove('loading');
          submitButton.removeAttribute('disabled');
        });
    }
  });
}




document.addEventListener("DOMContentLoaded", function(event) { 

  const halfOptionButton = document.getElementById("_1-Person")
  const fullOptionButton = document.getElementById("_2-Person")
  const optHalfContainer = document.getElementById("_1-Person-Option")
  const optFullContainer = document.getElementById("_2-Person-Option")
  
  halfOptionButton.addEventListener('click', function() {
    optHalfContainer.style.display = "block"
    optFullContainer.style.display = "none"
  })

  fullOptionButton.addEventListener('click', function() {
    optFullContainer.style.display = "block"
    optHalfContainer.style.display = "none"
  })

})