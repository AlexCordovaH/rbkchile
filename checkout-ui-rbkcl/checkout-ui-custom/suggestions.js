var slickScript = document.createElement('script') // Create script element for slick.min.js
slickScript.src = '/files/slick.min.js' // Adding the script code to the previously created element
document.body.appendChild(slickScript) // Adding the slick.min.js code to body

var slickCss = document.createElement('link') // Create css element for slick.css
slickCss.rel = 'stylesheet' // Adding the css attribute type to the previously created element
slickCss.href = '/files/slick.css' // Adding the css code to the previously created element
document.head.appendChild(slickCss) // Adding the slick.css code to head

var slickThemeCss = document.createElement('link') // Create css element for slick-theme.css (in this file you can insert your custom css)
slickThemeCss.rel = 'stylesheet' // Adding the css attribute type to the previously created element
slickThemeCss.href = '/files/slick-theme.css' // Adding the css code to the previously created element
document.head.appendChild(slickThemeCss) // Adding the slick-theme.css code to head

const shelfProps = {
  suggestionsContainer: '.productModalContainer', // JQuery selector of element in which the content will be inserted (can use class or id selector)
  suggestionsInsertMethod: 'append', // Insertion method (if suggestions container inserted in top or bottom of the suggestionsContainer)
  collectionId: '583', // This setting will ignore if useCrosseling is true
  shelfOrdenation: 2, // This setting will ignore if useCrosseling is true
  suggestionsTitle: 'Esto te puede interesar', // Header for cross selling section
  currency: 'COP', // Currency to format prices
  btnDefaultText: 'Añadir al carrito', // Add to cart button default text
  btnLoadingText: 'Agregando al carrito...', // Add to cart button loading text
  successText: 'El item {itemName} ha sido agregado al carrito con exito!', // Item to cart success message text
  useCrossSelling: false, // If method to get items use cross selling apis
  crossSellingStrategy: 1, // This setting will ignore if useCrosseling is false
  showWithoutStock: false, // If the items without stock should be displayed
  showSkusWithoutStock: false, // If the sku selector button without stock should be displayed
  // inCategory: '55' // This setting is for only call cross selling api when product is in this category
  itemsArr: [],
  sliderConfig: {
    // Carousel config props
    dots: false, // If the carousel should show dots
    arrows: true, // If the carousel should show arrows
    infinite: true, // If the carousel swipe is infinite or not
    slidesToShow: 4, // Number of slides to show
    slidesToScroll: 4, // Number of slides to scroll
    lazyLoad: 'ondemand', // Lazy load method
    responsive: [
      // Responsive breakpoints
      {
        breakpoint: 980,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 750,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 550,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  },
}
const ORDENATION_OPTIONS = [
  // shelfOrdenation: (Only works with collectionId fetch items method)
  'O=OrderByPriceDESC', // 1 -> Order By Price DESC
  'O=OrderByPriceASC', // 2 -> Order By Price ASC
  'O=OrderByTopSaleDESC', // 3 -> Order By Top Sale DESC
  'O=OrderByReleaseDateDESC', // 4 -> Order By Release Date DESC
  'O=OrderByBestDiscountDESC', // 5 -> Order By Best Discount DESC
  'O=OrderByReviewRateDESC', // 6 -> Order By Review Rate DESC
]
const CROSSSELLING_STRATEGY_OPTIONS = [
  // crossSellingStrategy:
  'whosawalsosaw', // 1 -> Who Saw Also Saw
  'whosawalsobought', // 2 -> Who Saw Also Bought
  'whoboughtalsobought', // 3 -> Who Bought Also Bought
  'accessories', // 4 -> Accessories
  'similars', // 5 -> Similars
  'suggestions', // 6 -> Suggestions
]

const formatCurrency = (value) => {
  return value.toLocaleString('es-CL', { style: 'currency', minimumFractionDigits: 0, maximumFractionDigits: 0, currency: shelfProps.currency }).replace("COP", "$")
}
const buildShelfItem = (item) => {
  let idSKU = item.items[0].itemId
  $('.suggestionsContainer').append(
    `<li class="item" data-product-id="${item.productId}" data-sku-id="${idSKU}" ${
      item.items.length > 1 ? 'data-has-variations="true"' : ''
    }>${buildContentItem(item)}</li>`
  )
}
const buildContentItem = (item) => {
  let firstItemWithStock = item.items.filter((it) => it.sellers[0].commertialOffer.AvailableQuantity > 0)
  let image = firstItemWithStock[0].images[0].imageTag
    .replaceAll('#width#', '200')
    .replaceAll('#height#', '200')
    .replaceAll('~', '')
  let name = item.productName
  let listPrice = firstItemWithStock[0].sellers[0].commertialOffer.ListPrice
  let listPriceFormat = formatCurrency(listPrice)
  let bestPrice = firstItemWithStock[0].sellers[0].commertialOffer.Price
  let bestPriceFormat = formatCurrency(bestPrice)
  if (item.items.length > 1 || item.items[0].sellers[0].commertialOffer.AvailableQuantity > 0) {
    // Modify this code if you want to modify the structure of the item card
    return `
      <section class="itemContainer">
        <a href="${item.link}" class="itemLink">
          <article class="item">
            <div class="itemImageContainer">${image}</div>
            <div class="itemNameContainer"><p class="itemName">${name}</p></div>
            <div class="itemPriceContainer">
            <span class="itemPrice">${bestPriceFormat}</span>
            ${listPrice != bestPrice ? `<span class="itemBeforePrice">${listPriceFormat}</span>` : ''}
            </div>
            <button class="ctaButton itemAddToCartButton">${shelfProps.btnDefaultText}</button>
          </article>
        </a>
      </section>`
  } else if (shelfProps.showWithoutStock) {
    // Modify this code if you want to modify the structure of the item card without stock
    return `
      <section class="itemContainer">
        <a href="${item.link}" class="itemLink">
          <article class="item">
            <div class="itemImageContainer">${image}</div>
            <div class="itemNameContainer"><p class="itemName">${name}</p></div>
            <button class="ctaButton disabled itemAddToCartButtonUnavaiable">No disponible</button>
          </article>
        </a>
      </section>`
  }
}
const fillInSlick = (data) => {
  const suggestionsHTML = `
    <div class="suggestions">
      <div class='container-progressbar'>
        <div class='progressbar'>
          <p class='icon'></p>
          <div>
          </div>
        </div>
      </div>
      <h2 class="suggestions__title">${shelfProps.suggestionsTitle}</h2>
      <div class="suggestionsContainer"></div>
    </div>`

    //This line trigger the orderForm update and makes the progressbar being updated with the price and messages
    vtexjs.checkout.getOrderForm().then(() => {})
    // update

  if (shelfProps.suggestionsInsertMethod === 'prepend') {
    $(shelfProps.suggestionsContainer).prepend(suggestionsHTML)
  } else {
    $(shelfProps.suggestionsContainer).append(suggestionsHTML)
  }
  $.each(data, (i, _el) => {
    buildShelfItem(data[i])
  })
  $('.suggestionsContainer').slick(shelfProps.sliderConfig)
}
const findValue = (key, content) => {
  for (let i = 0; i < content?.length; i++) {
    if (content[i].id) {
      if (key === content[i].id) return [content[i], content[i].quantity, i]
    } else {
      return [false, 0]
    }
  }
  return [false, 0]
}
const clearButtonState = (btn, success, itemProps) => {
  btn.text(shelfProps.btnDefaultText)
  btn.removeAttr('disabled')
  let titleMsg = shelfProps.successText.includes('{itemName}')
    ? shelfProps.successText.replace('{itemName}', itemProps.name)
    : shelfProps.successText
  if (success) {
    $(window).trigger('addMessage', {
      content: { title: titleMsg },
      type: 'success',
    })
  }
}

const variationsModal = (productId) => {
  const updateModalContent = () => {
    const product = shelfProps.itemsArr.find((item) => item.productId == productId)
    const firstItemWithStock = product.items.filter((it) => it.sellers[0].commertialOffer.AvailableQuantity > 0)
    const image = firstItemWithStock[0].images[0].imageTag
      .replaceAll('#width#', '400')
      .replaceAll('#height#', '400')
      .replaceAll('~', '')
    let listPrice = firstItemWithStock[0].sellers[0].commertialOffer.ListPrice
    let bestPrice = firstItemWithStock[0].sellers[0].commertialOffer.Price
    let listPriceFormat = formatCurrency(listPrice)
    let bestPriceFormat = formatCurrency(bestPrice)

    // Modificar la selección para que use jQuery
    let modalSelector = $('.suggestions_modalSkuSelector')
    // Verificar si el modal ya está abierto
    if (modalSelector) {
      var nuevoDiv = document.createElement('div')
      nuevoDiv.textContent = '.'
      nuevoDiv.classList.add('miClase')
      document.body.insertAdjacentElement('beforeend', nuevoDiv)

      $('body').append(`
        <section class="suggestions_modalSkuSelector">
          <div class="suggestions_container">
            <div class="suggestions_imageArea"></div>
            <div class="suggestions_infoArea">
              <p class="suggestions_prodName"></p>
              <div class="suggestions_prodPrices">
                <span class="suggestions_prodPrice"></span>
                <span class="suggestions_prodBeforePrice"></span>
              </div>
              <div class="suggestions_more-information">
                ${product["Más Información"] ?? ""}
              </div>
              <div class="suggestions_variations">
                ${product.skuSpecifications.map((spec) => {
                  return `<div class="suggestions_variationGroup suggestions_variationGroup__${spec.field.name.toLowerCase()}">
                    <p class="suggestions_variationGroupTitle">Selecciona la ${spec.field.name}</p>
                    <div class="suggestions_variationOptions">
                      ${spec.values
                        .map((specOption) => {
                          let current = product.items.find((el) => {
                            return el[spec.field.name] == specOption.name
                          })
                          let variationId = current.itemId
                          let commertialOffer = current.sellers[0].commertialOffer
                          let active = commertialOffer.AvailableQuantity ? true : false
                          if (!active && !shelfProps.showSkusWithoutStock) return
                          return `<div class="suggestions_variationOption ${
                            !active ? 'suggestions_variationOption__disabled' : ''
                          }" data-variation-id="${variationId}">
                            ${specOption.name}
                          </div>`
                        })
                        .join('')}
                    </div>
                  </div>`
                })}
              </div>
              <div class="suggestions_inModalToCart suggestions_inModalToCart__disabled">${
                shelfProps.btnDefaultText
              }</div>
            </div>
            <button class="closeButtonM">X</button>
          </div>
        </section>
      `)

      // Volver a seleccionar el modal después de agregarlo
      modalSelector = $('.suggestions_modalSkuSelector')

      // Manejar eventos dentro del modal
      $('.closeButtonM').on('click', function () {
        modalSelector.fadeOut()
      })
    }

    // Seleccionar elementos dentro del modal
    const imageArea = modalSelector.find('.suggestions_imageArea')
    const prodName = modalSelector.find('.suggestions_prodName')
    const prodPrice = modalSelector.find('.suggestions_prodPrice')
    const prodBeforePrice = modalSelector.find('.suggestions_prodBeforePrice')

    // Actualizar los datos en los elementos
    imageArea.html(image + `<a class='suggestions_imageArea_link' href="${product.link}">Más Información</a>`)
    prodName.text(product.productName)
    prodPrice.text(bestPriceFormat)

    if (listPrice != bestPrice) {
      prodBeforePrice.text(listPriceFormat)
    }

    // Mostrar el modal
    modalSelector.fadeIn().css('display', 'flex')
  }

  // Llamar a la función de actualización
  updateModalContent()
}

function addToCartFunction(event) {
  event.preventDefault()
  event.stopPropagation()
  $('.suggestions_modalSkuSelector').toggle()
  var button = $(this)
  var data = button.parents('li').data()
  if (data.hasVariations) {
    variationsModal(data.productId)
    return
  }
  button.attr('disabled', true)
  button.text(shelfProps.btnLoadingText)
  vtexjs.checkout.getOrderForm().done(function (orderForm) {
    let miniCartItems = orderForm.items
    var isFind = findValue(data.skuId.toString(), miniCartItems)
    if (isFind[0]) {
      //If the item exist in the orderForm
      var items = [{ quantity: isFind[1] + 1, index: isFind[2] }]
      vtexjs.checkout.updateItems(items).then(function (orderForm) {
        let itemOf = orderForm.items.filter((ofItem) => ofItem.id == data.skuId)
        let success = itemOf[0].quantity > isFind[0].quantity
        clearButtonState(button, success, isFind[0])
      })
    } else {
      //If the item not exist in the orderForm
      var item = { id: data.skuId, quantity: 1, seller: '1' }
      vtexjs.checkout.addToCart([item], null, 1).done(function (orderForm) {
        let itemOf = orderForm.items.filter((ofItem) => ofItem.id == data.skuId)
        clearButtonState(button, true, itemOf[0])
      })
    }
  })
}
function addToCartFromModal() {
  var button = $(this)
  if (button.hasClass('suggestions_inModalToCart__disabled')) return
  button.addClass('suggestions_inModalToCart__disabled')
  button.text(shelfProps.btnLoadingText)
  var data = button.data()
  vtexjs.checkout.getOrderForm().done(function (orderForm) {
    let miniCartItems = orderForm.items
    var isFind = findValue(data.selectedSku.toString(), miniCartItems)
    if (isFind[0]) {
      //If the item exist in the orderForm
      var items = [{ quantity: isFind[1] + 1, index: isFind[2] }]
      vtexjs.checkout.updateItems(items).then(function (orderForm) {
        let itemOf = orderForm.items.filter((ofItem) => ofItem.id == data.selectedSku)
        let success = itemOf[0].quantity > isFind[0].quantity
        clearButtonState(button, success, isFind[0])
        $('.suggestions_modalSkuSelector').fadeOut(function () {
          $(this).remove()
        })
      })
    } else {
      //If the item not exist in the orderForm
      var item = { id: data.selectedSku, quantity: 1, seller: '1' }
      vtexjs.checkout.addToCart([item], null, 1).done(function (orderForm) {
        let itemOf = orderForm.items.filter((ofItem) => ofItem.id == data.selectedSku)
        clearButtonState(button, true, itemOf[0])
        $('.suggestions_modalSkuSelector').fadeOut(function () {
          $(this).remove()
        })
      })
    }
  })
}

$(window).load(function () {
  if (!shelfProps.suggestionsContainer) {
    console.warn('CROSS SELLING - You must indicate the selector in which the suggestions will be inserted')
    return false
  }
  if ($('.empty-cart-content').css('display') == 'none') {
    let shelfOrdenation = ORDENATION_OPTIONS[shelfProps.shelfOrdenation - 1] || 'O=OrderByPriceDESC'
    let crossSellingStrategy = CROSSSELLING_STRATEGY_OPTIONS[shelfProps.crossSellingStrategy - 1] || 'whosawalsosaw'
    var requestUrl = `/api/catalog_system/pub/products/search?fq=productClusterIds:${shelfProps.collectionId}&${shelfOrdenation}`
    if (shelfProps.useCrossSelling) {
      vtexjs.checkout.getOrderForm().done(function (orderForm) {
        let miniCartItems = orderForm.items
        var recomendadosAcumulados = []
        for (var i = 0; i < miniCartItems?.length; i++) {
          requestUrl = `/api/catalog_system/pub/products/crossselling/${crossSellingStrategy}/${miniCartItems[i].productId}`
          if (shelfProps.inCategory) {
            if (miniCartItems[i].productCategories[shelfProps.inCategory]) {
              $.ajax({ url: requestUrl, async: false }).done(function (data) {
                const filteredData = data.filter((prod) => prod.productId != miniCartItems[i].productId)
                recomendadosAcumulados =
                  miniCartItems?.length == 1
                    ? recomendadosAcumulados.concat(filteredData)
                    : recomendadosAcumulados.concat(filteredData.slice(0, 4))
              })
            }
          } else {
            $.ajax({ url: requestUrl, async: false }).done(function (data) {
              const filteredData = data.filter((prod) => prod.productId != miniCartItems[i].productId)
              recomendadosAcumulados =
                miniCartItems?.length == 1
                  ? recomendadosAcumulados.concat(filteredData)
                  : recomendadosAcumulados.concat(filteredData.slice(0, 4))
            })
          }
        }
        shelfProps.itemsArr = recomendadosAcumulados
        if (recomendadosAcumulados.length) fillInSlick(recomendadosAcumulados)
      })
    } else {
      $.ajax({ url: requestUrl }).done(function (data) {
        shelfProps.itemsArr = data
        fillInSlick(data)
      })
    }

    // Add to cart
    $('body').on('click', '.itemAddToCartButton', addToCartFunction)

    // Sku selector
    $('body').on('click', '.suggestions_variationOption', function () {
      if (
        $(this).hasClass('suggestions_variationOption__disabled') ||
        $(this).hasClass('suggestions_variationOption__active')
      )
        return
      $(this).siblings().removeClass('suggestions_variationOption__active')
      $(this).addClass('suggestions_variationOption__active')
      $('.suggestions_inModalToCart').removeClass('suggestions_inModalToCart__disabled')
      $('.suggestions_inModalToCart').data('selected-sku', $(this).data().variationId)
    })

    // Add to cart from sku selector modal
    $('body').on('click', '.suggestions_inModalToCart', addToCartFromModal)
  }
})
