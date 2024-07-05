/********************************** Inicio factura ********************************/

/* Parameters to activate or deactivate */

/*bill*/

//var client_bill = '<a class="buttom-factura">Factura</a>'; /* => checkout with invoice */

var client_bill = '' /* =>  checkout without invoice */

/*ticket*/
//prueba
//var client_ticket = '<a class="buttom-boleta">Boleta</a>'; /* => checkout with ballot */

var client_ticket = '' /* =>  checkout without a ballot */

/* End Parameters to activate or deactivate*/

var storeName = 'reebokcl'
var dataentitiesId = 'EM'

var urlVtexMasterSearch = `/api/dataentities/${dataentitiesId}/search?_where=rut={0}&_fields=address,business_line,business_name,commune,number,number_dep,phone,region,rut`
var raiz = '../'
var files = [`${raiz}arquivos/sweet-alert.js`]

var pass = 0
var pass2 = 0
var check = 0
var regiones = []
var comunas = []
var rutEmpresa = ''

var entity = {
  address: '',
  business_line: '',
  business_name: '',
  commune: '',
  number: '',
  number_dep: '',
  phone: '',
  region: '',
  rut: '',
}

setInterval(function () {
  setTimeout(function () {
    if ($('.body-order-form').length) pass2++
  }, 300)

  if ($('.body-order-form').length > 0 && pass < 1) {
    $(function () {
      setup()
      loadRegionComuna()
    })

    /*var titulo_doc = '<div class="titulo_doc"><h5><i class="far fa-file-alt"></i> Seleccione tipo documento</h5></div>'; */

    var corporateTitleNew = '<h5 class="corporate__title-new"><i class="far fa-clipboard"></i> Datos de la empresa</h5>'

    var rut =
      '<div class="client__rut input text"><label>Rut de la Empresa</label><input type="text" id="client__rut" class="client__rut input-xlarge" name="rut"><span id="spnErrorRut" class="error"></span></div>'

    var businessName =
      '<div class="client__business-name input text"><label>Razón Social</label><input type="text" id="client-business-name" class="client__business__name input-xlarge" name="business_name"><span id="spnErrorBusinessname" class="error"></span></div>'

    var giro =
      '<div class="client__business-line input text"><label>Giro</label><input type="text" id="business-line" class="business__line input-xlarge"  name="business_line"><span id="spnErrorBusinessline" class="error"></span></div>'

    var phone =
      '<div class="client__phone input text"><label>Teléfono</label><input type="text" id="client-phone-new" class="client__phone input-xlarge" name="phone" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"><span id="spnErrorTelefono" class="error"></span></div>'

    var addressTitle = '<h5 class="corporate__title-new"><i class="far fa-clipboard"></i> Dirección de la empresa</h5>'

    var address =
      '<div class="client__address input text"><label>Dirección / Calle</label><input type="text" id="client-address" class="client__address input-xlarge" name="address"><span id="spnErrorClientAddress" class="error"></span></div>'

    var number =
      '<div class="client__number input text"><label> Número </label><input type="text" id="client-number" class="client__number input-xlarge" name="number" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"><span id="spnErrorClientNumber" class="error"></span></div>'

    var number_dep =
      '<div class="client__number-dep input text"><label>Depto / Oficina / Casa </label><input type="text" id="client-number-dep" class="client__number__dep input-xlarge" name="number_dep" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"><span id="spnErrorClientNumberDep" class="error"></span></div>'

    var region =
      '<div class="client__region input text"><label>Región</label><select id="cmbRegion"></select></span><span id="spnErrorClientRegion" class="error"></span></div>'

    var commune =
      '<div class="client__commune input text"><label>Comuna</label><select id="cmbComuna"></select><span id="spnErrorClientCommune" class="error"></span></div>'

    var Box_info_pj = '<div class ="div_client_form"></div>'

    // $(".box-client-info-pj").prepend(titulo_doc);
    $('.box-client-info-pj').append(Box_info_pj)
    $('.div_client_form').append(client_ticket)
    $('.div_client_form').append(client_bill)

    var Box_pj = '<form id="formCompraFactura"><div class ="class_client_form">'

    var Box_pj2 = '</div></form>'

    $('.box-client-info-pj').append(Box_pj)

    $('.class_client_form').append(
      corporateTitleNew,
      rut,
      businessName,
      giro,
      phone,
      addressTitle,
      address,
      number,
      number_dep,
      region,
      commune
    )

    setMaxLenght()

    eventFormFactura()

    $('.box-client-info-pj').append(Box_pj2)
    $('.buttom-boleta').addClass('disabled')

    pass++

    if (!client_ticket) {
      $('.class_client_form').show('fast')
      $('.class_client_form').css('display', 'none')
      $('.buttom-factura').css('background', '#d4d4d4')
      $('.buttom-factura').css('color', '#000000')
      //$(".buttom-factura").addClass('disabled');
    } else {
      $('.class_client_form').css('display', 'none')
    }

    if (!client_bill) {
      $('.box-client-info-pj').css('display', 'none')
    }

    $('.buttom-factura').on('click', function (e) {
      $('.class_client_form').show('fast')
      $('.class_client_form').css('display', 'block')
      $('.buttom-factura').css('background', '#d4d4d4')
      $('.buttom-boleta').css('display', 'block')
      $('.buttom-boleta').css('background', '#ffffff')
      //$(".buttom-factura").css('color', '#fff');
      $('.buttom-boleta').css('color', '#000000')
      $('.buttom-boleta').removeClass('disabled')

      if ($('.buttom-factura')[0].classList[1] == undefined) {
        $('.buttom-factura').addClass('lock')
        $('.class_client_form').css('display', 'block')
      } else {
        $('.buttom-factura').removeClass('lock')
        $('.class_client_form').css('display', 'none')
      }

      check = 1
    })

    $('.buttom-boleta').on('click', function (e) {
      $('.buttom-factura').removeClass('lock')
      $('.class_client_form').show('fast')
      $('.class_client_form').css('display', 'none')
      $('.buttom-factura').css('display', 'block')
      $('.buttom-boleta').css('background', '#d4d4d4')
      $('.buttom-factura').css('background', '#ffffff')
      $('.buttom-boleta').css('color', '#000000')
      $('.buttom-factura').css('color', '#000000')
      $('.buttom-boleta').addClass('disabled')
      $('.buttom-factura').removeClass('disabled')

      check = 0
    })

    function setup() {
      if ($('#go-to-shipping')[0].style.length == 0) {
        shippingSubmit = $('#go-to-shipping')
      }

      if ($('#go-to-payment')[0].style.length == 0) {
        shippingSubmit = $('#go-to-payment')
      }
      //Checked input newsletter
      const checkNW = document.querySelector('#opt-in-newsletter')
      if (!!checkNW) {
        checkNW.click()
      }
      // Keypress on phone input
      const inputPhone = document.querySelector('#client-phone')

      if (!!inputPhone) {
        inputPhone.onkeyup = ({ target }) => {
          const phone = target.value
          if (phone.length > 9) {
            target.value = phone.substr(0, 9)
          }
        }
        inputPhone.onchange = ({ target }) => {
          const phone = target.value
          if (phone.length > 9) {
            target.value = phone.substr(0, 9)
          }
        }
      }
      // Click on submit button
      shippingSubmit.on('click', function (e) {
        //e.preventDefault();
        e.stopImmediatePropagation()

        var exist = $('.buttom-boleta.disabled').length
        var valor = 0
        isValidForm()
        var check2 = 'false'

        if (
          !$('#client__rut').val() ||
          !$('#client-business-name').val() ||
          !$('#business-line').val() ||
          !$('#client-phone-new').val() ||
          !$('#client-address').val() ||
          !$('#client-number').val() ||
          !$('#cmbRegion').val() ||
          !$('#cmbComuna').val()
        ) {
          if (!exist) {
            valor = 1
          } else {
            valor = 0
          }

          mensajeAlert(valor)
          return false
        } else {
          handleShippingSubmit()
          return false
        }
      })
    }

    isValid2 = ''

    function isValidForm() {
      var isValid = true

      var regExp_Telefono = new RegExp(/^[+0-9]{8,12}$/i)

      isFormatValidRut($('#client__rut'))

      if ($('#client-business-name').val().length == 0) {
        isValid = false
        $('#spnErrorBusinessname').text('El campo es obligatorio.')
        $('.client__business__name').removeClass('success')
      } else {
        $('#spnErrorBusinessname').text('')
        $('.client__business__name').addClass('success')
      }

      if ($('#business-line').val().length == 0) {
        isValid = false
        $('#spnErrorBusinessline').text('El campo es obligatorio.')
        $('.business__line').removeClass('success')
      } else {
        $('#spnErrorBusinessline').text('')
        $('.business__line').addClass('success')
      }

      if (!regExp_Telefono.test($('#client-phone-new').val())) {
        isValid = false
        $('#spnErrorTelefono').text('El teléfono no es valido.')
        $('.client__phone').removeClass('success')
      } else {
        $('#spnErrorTelefono').text('')
        $('.client__phone').addClass('success')
      }

      if ($('#client-address').val().length == 0) {
        isValid = false
        $('#spnErrorClientAddress').text('El campo es obligatorio.')
        $('.client__address').removeClass('success')
      } else {
        $('#spnErrorClientAddress').text('')
        $('.client__address').addClass('success')
      }
      if ($('#client-number').val().length == 0) {
        isValid = false
        $('#spnErrorClientNumber').text('El campo es obligatorio.')
        $('.client__number').removeClass('success')
      } else {
        $('#spnErrorClientNumber').text('  ')
        $('.client__number').addClass('success')
      }
      /*
            if($("#client-number-dep").val().length == 0)
            {
                isValid = false;
                $("#spnErrorClientNumberDep").text('El campo es opcional.');
                $(".client__number__dep").removeClass('success');
            }
            else
            {
                $("#spnErrorClientNumberDep").text('');
                $(".client__number__dep").addClass('success');
            } */

      isValid2 = isValid
      return isValid
    }

    function handleShippingSubmit() {
      var idOrderForm = ''
      idOrderForm = vtexjs.checkout.orderFormId

      getFromMasterData(`${dataentitiesId}`, `orderformid=${idOrderForm}`, 'orderformid', (result) => {
        var properData = {
          rut: $('#client__rut').val(),
          business_name: $('#client-business-name').val(),
          business_line: $('#business-line').val(),
          phone: $('#client-phone-new').val(),
          address: $('#client-address').val(),
          number: $('#client-number').val(),
          number_dep: $('#client-number-dep').val(),
          region: $('#cmbRegion').val(),
          commune: $('#cmbComuna').val(),
          orderformid: idOrderForm,
        }

        var openTextField = `{"Factura":[{"client__rut":"${$('#client__rut').val()}","client-business-name":"${$(
          '#client-business-name'
        ).val()}","business-line":"${$('#business-line').val()}","client-phone-new":"${$(
          '#client-phone-new'
        ).val()}","client-address":"${$('#client-address').val()}","client-number":"${$(
          '#client-number'
        ).val()}","client-number-dep":"${$('#client-number-dep').val()}","cmbRegion":"${$(
          '#cmbRegion'
        ).val()}","cmbComuna":"${$(
          '#cmbComuna'
        ).val()}","orderformid":"${idOrderForm}","anexoFactura": []}],"Pedido":[]}`

        var exist = $('.buttom-boleta.disabled').length
        var url = `/api/dataentities/${dataentitiesId}/documents`

        var type = 'POST'

        if ($('.lock').length > 0) {
          vtexjs.checkout
            .getOrderForm()
            .then(function (orderForm) {
              return vtexjs.checkout.sendAttachment('openTextField', { value: openTextField })
            })
            .done(function (orderForm) { })

          postRegistCompany(url, properData, type)
        } else {
          $('.title-buyInvoice').remove()
          $('.step.accordion-group.client-profile-data').prepend(
            '<div class="title-buyInvoice">Compra con Boleta</div>'
          )
          $('#formCompraFactura').submit()
        }
      })
      return false
    }

    function loadRegionComuna() {
      $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '../arquivos/CountryCHL.js',
        success: function (response) {
          var data = response.split('this.map=')
          var json = data[1].split('}}')[0]
          json = json + '}}'
          json = json.split('"').join('')
          json = json.split('{').join('{"')
          json = json.split(':').join('":')
          json = json.split(',').join(',"')

          data = $.parseJSON(json)

          for (region in data) {
            regiones.push({
              id: region,
              nombre: region,
            })

            for (comuna in data[region]) {
              comunas.push({
                id: comuna,
                id_region: region,
                nombre: comuna,
                codigo: data[region][comuna],
              })
            }
          }

          $.each(regiones, function (index, value) {
            if (index == 0) {
              $('#cmbRegion').append(new Option('-- Seleccione una Región --', ''))
              $('#cmbComuna').append(new Option('-- Seleccione una Comuna --', ''))
            }
            $('#cmbRegion').append(new Option(value.nombre, value.id))
          })

          $('#cmbRegion').change(function () {
            var id = $(this).val()
            $('#cmbComuna').find('option').remove().end().append(new Option('-- Seleccione una Comuna --', ''))

            if (id != undefined && id != null && id != '') {
              $.each(comunas, function (index, value) {
                if (value.id_region == id) $('#cmbComuna').append(new Option(value.nombre, value.nombre))
              })
            }
          })
        },
      })
    }

    $('.icon-edit').on('click', function (e) {
      if (vtexjs.checkout.orderForm.openTextField != null) {
        $('.buttom-factura').css('background', '#d50032')
        $('.buttom-boleta').css('display', 'block')
        $('.buttom-boleta').css('background', '#ffffff')
        $('.buttom-boleta').css('color', '#000000')
        $('.buttom-boleta').removeClass('disabled')
        $('.class_client_form').css('display', 'block')

        $('.buttom-factura').addClass('lock')

        consultarOpenTextField()
      } else {
        $('.class_client_form').css('display', 'none')
      }

      setup()
    })
  }

  function setMaxLenght() {
    $('#client__rut').attr('maxlength', '10')
    $('#client-business-name').attr('maxlength', '50')
    $('#business-line').attr('maxlength', '50')
    $('#client-address').attr('maxlength', '80')
    $('#client-number').attr('maxlength', '10')
    $('#client-number-dep').attr('maxlength', '10')
    $('#client-phone-new').attr('maxlength', '12')
  }

  function isFormatValidRut(control) {
    $('#spnErrorRut').text('')

    var value = $(control).val().replace('-', '').toLowerCase()

    if (value != '') {
      var rut = value.substring(0, value.length - 1)
      var dv = value.substring(value.length - 1, value.length)
      var validate = 'false'

      $(control).val(rut + '-' + dv)

      value = $(control).val()
      var regExp_Rut = new RegExp(/^[0-9]+-[0-9kK]{1}$/)
      if (!regExp_Rut.test(value)) {
        $('#spnErrorRut').text('Rut con formato incorrecto')
        $('.client__rut').removeClass('success')
        validate = 'false'
      } else {
        validate = 'true'
      }

      var M = 0,
        S = 1
      for (; rut; rut = Math.floor(rut / 10)) {
        S = (S + (rut % 10) * (9 - (M++ % 6))) % 11
      }

      var digV = S ? S - 1 : 'k'
      if (dv != digV) {
        $('#spnErrorRut').text('Rut incorrecto.')
        $('.client__rut').removeClass('success')
        validate = 'false'
      }

      if (validate == 'true') {
        $('.client__rut').addClass('success')

        $('#client-address').removeClass('disabled')
        $('#business-line').removeClass('disabled')
        $('#client-business-name').removeClass('disabled')
        $('#cmbComuna').removeClass('disabled')
        $('#client-number').removeClass('disabled')
        $('#client-number-dep').removeClass('disabled')
        $('#client-phone-new').removeClass('disabled')
        $('#cmbRegion').removeClass('disabled')

        //limpiarInfo();

        rutEmpresa = $('#client__rut').val()

        $.ajax({
          type: 'GET',
          dataType: 'json',
          url: urlVtexMasterSearch.replace('{0}', rutEmpresa),
          success: function (data) {
            var arrayCant = data.length

            if (data.length > 0) {
              $.each(data, function (i, val) {
                if (arrayCant - 1 == i) {
                  entity.address = data[data.length - 1].address
                  entity.business_line = data[data.length - 1].business_line
                  entity.business_name = data[data.length - 1].business_name
                  entity.commune = data[data.length - 1].commune
                  entity.number = data[data.length - 1].number
                  entity.number_dep = data[data.length - 1].number_dep
                  entity.phone = data[data.length - 1].phone
                  entity.region = data[data.length - 1].region
                  entity.rut = $('#client__rut').val()

                  $('.client__business__name').addClass('success')
                  $('.business__line').addClass('success')
                  $('.client__phone').addClass('success')
                  $('.client__address').addClass('success')
                  $('.client__number').addClass('success')
                  $('.client__number__dep').addClass('success')
                  $('.client__region').addClass('success')
                  $('.client__commune').addClass('success')
                  loadInfo()
                }
              })
            } else {
              entity.address = $('#client-address').val()
              entity.business_line = $('#business-line').val()
              entity.business_name = $('#client-business-name').val()
              entity.commune = $('#cmbComuna').val()
              entity.number = $('#client-number').val()
              entity.number_dep = $('#client-number-dep').val()
              entity.phone = $('#client-phone-new').val()
              entity.region = $('#cmbRegion').val()
              entity.rut = $('#client__rut').val()
              loadInfo()
            }

            //setMaxLenght();
          },
          error: function (error) { },
        })
      } else {
        limpiarInfo()
      }
    } else $('#spnErrorRut').text('El campo es obligatorio.')
  }

  function eventFormFactura() {
    $('#client__rut').blur(function () {
      isFormatValidRut(this)
      return false
    })
  }

  // GET information from masterdata
  function getFromMasterData(databaseTableName, where, fields, handleData) {
    var urlProtocol = window.location.protocol
    var apiURL = `/api/dataentities/${dataentitiesId}/search?_where=${where}&_fields=${fields}`
    $.ajax({
      headers: {
        Accept: 'application/vnd.vtex.masterdata.v10.profileSchema+json',
      },
      url: apiURL,
      async: false,
      crossDomain: true,
      type: 'GET',
      success: function (result) {
        handleData(result)
      },
      error: function (errorThrown) {
        let result = {
          error: errorThrown,
        }
        handleData(result)
      },
    })
  }

  // POST record business data
  function postRegistCompany(url, properData, type) {
    $.ajax({
      accept: 'application/vnd.vtex.ds.v10+json',
      contentType: 'application/json; charset=utf-8',
      crossDomain: true,
      data: JSON.stringify(properData),
      type: type,
      url: url,
      beforeSend: function () {
        let content = `<div id='loader__container'>
									<img id="loader__image" src="/arquivos/ajax-loader.gif" style="display:none;"/>
								  </div>`
        $('.box-client-info-pj').append(content)
        $('#loader__image').show()
      },
      success: function () {
        $.when
          .apply(
            $,
            $.map(files, (file) => {
              return $.getScript(files)
            })
          )
          .then(function () {
            Swal.fire({
              title: 'Sus datos de factura se guardaron con éxito',
              imageUrl: '/arquivos/factura-logo.png',
            }).then((result) => {
              $('#loader__container').remove()
              $('.title-buyInvoice').remove()
              $('.step.accordion-group.client-profile-data').prepend(
                '<div class="title-buyInvoice">Compra con factura</div>'
              )
              if (result.value) $('#formCompraFactura').submit()
            })
          })
      },
      error: function () {
        $.when
          .apply(
            $,
            $.map(files, (file) => {
              return $.getScript(files)
            })
          )
          .then(function () {
            Swal.fire({
              title: 'Tuvimos un problema procesando sus datos de factura, intente nuevamente.',
              imageUrl: '/arquivos/factura-logo-x.png',
            }).then((result) => {
              $('.title-buyInvoice').remove()
              $('.step.accordion-group.client-profile-data').prepend(
                '<div class="title-buyInvoice">Compra con Boleta</div>'
              )
              $('#loader__container').remove()
              if (result.value) $('#formCompraFactura').submit()
            })
          })
      },
    })
  }

  function mensajeAlert(valor) {
    if ($('.lock').length > 0) {
      $.when
        .apply(
          $,
          $.map(files, (file) => {
            return $.getScript(files)
          })
        )
        .then(function () {
          Swal.fire({
            title:
              'NOTA: si desea que se emita la factura de su compra es IMPORTANTE que llene todos los campos. <br>¿Desea continuar la compra sin factura?',
            imageUrl: '/arquivos/factura-logo.png',

            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Sí',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.value) {
              $('.class_client_form').css('display', 'none')
              $('.buttom-factura').css('display', 'block')
              $('.buttom-boleta').css('background', '#B12B2B')
              $('.buttom-factura').css('background', '#d4d4d4')
              $('.buttom-boleta').css('color', '#fff')
              $('.buttom-factura').css('color', '#000000')
              $('.buttom-boleta').addClass('disabled')
              $('.buttom-factura').removeClass('disabled')
              $('.title-buyInvoice').remove()
              $('.buttom-factura').removeClass('lock')
              $('.step.accordion-group.client-profile-data').prepend(
                '<div class="title-buyInvoice">Compra con Boleta</div>'
              )

              if (!client_ticket) {
                $('.class_client_form').show('fast')
                $('.class_client_form').css('display', 'block')
                $('.buttom-factura').css('background', '#B12B2B')
                $('.buttom-factura').css('color', '#fff')
                $('.buttom-factura').removeClass('lock')
              } else {
                $('.class_client_form').css('display', 'none')
              }

              $('#formCompraFactura').submit()
            }
          })
        })
    } else {
      $('.title-buyInvoice').remove()
      $('.step.accordion-group.client-profile-data').prepend('<div class="title-buyInvoice">Compra con Boleta</div>')
      $('#formCompraFactura').submit()
    }
  }

  function loadInfo() {
    $('#client-address').val(entity.address)
    $('#business-line').val(entity.business_line)
    $('#client-business-name').val(entity.business_name)
    $('#cmbComuna').val(entity.commune)
    $('#client-number').val(entity.number)
    $('#client-number-dep').val(entity.number_dep)
    $('#client-phone-new').val(entity.phone)
    $('#cmbRegion').val(entity.region)
    $('#client__rut').val(entity.rut)

    $.each(comunas, function (index, value) {
      if (value.id_region == $('#cmbRegion').val()) $('#cmbComuna').append(new Option(value.nombre, value.nombre))
    })
    $('#cmbComuna').val(entity.commune)

    $('#txtRut').attr('readonly', true)
    $('#txtEmailContacto').attr('readonly', true)
    $('#txtRazonSocial').attr('readonly', true)
  }

  function limpiarInfo() {
    $('#client-address').val('')
    $('#business-line').val('')
    $('#client-business-name').val('')
    $('#cmbComuna').val('')
    $('#client-number').val('')
    $('#client-number-dep').val('')
    $('#client-phone-new').val('')
    $('#cmbRegion').val('')

    $('#client-address').removeClass('success')
    $('#business-line').removeClass('success')
    $('#client-business-name').removeClass('success')
    $('#cmbComuna').removeClass('success')
    $('#client-number').removeClass('success')
    $('#client-number-dep').removeClass('success')
    $('#client-phone-new').removeClass('success')
    $('#cmbRegion').removeClass('success')
  }

  function consultarOpenTextField() {
    if ($('.buttom-boleta.disabled').length == 0 && vtexjs.checkout.orderForm.openTextField != null) {
      if (
        !$('#client__rut').val() ||
        !$('#client-business-name').val() ||
        !$('#business-line').val() ||
        !$('#client-phone-new').val() ||
        !$('#client-address').val() ||
        !$('#client-number').val() ||
        !$('#cmbRegion').val() ||
        !$('#cmbComuna').val()
      ) {
        let inputValues = JSON.parse(vtexjs.checkout.orderForm.openTextField.value).Factura[0]

        $('#client__rut').val(inputValues['client__rut'])
        $('.client__rut').addClass('success')

        $('#client-business-name').val(inputValues['client-business-name'])
        $('.client__business__name').addClass('success')

        $('#business-line').val(inputValues['business-line'])
        $('.business-line').addClass('success')

        $('#client-phone-new').val(inputValues['client-phone-new'])
        $('.client__phone').addClass('success')

        $('#client-address').val(inputValues['client-address'])
        $('.client__address').addClass('success')

        $('#client-number').val(inputValues['client-number'])
        $('.client__number').addClass('success')

        $('#client-number-dep').val(inputValues['client-number-dep'])
        $('.client__number-dep').addClass('success')

        $('#cmbRegion').val(inputValues['cmbRegion'])
        $('.client__region').addClass('success')

        $.each(comunas, function (index, value) {
          if (value.id_region == $('#cmbRegion').val()) $('#cmbComuna').append(new Option(value.nombre, value.nombre))
        })

        $('#cmbComuna').val(inputValues['cmbComuna'])
        $('.client__commune').addClass('success')
      }
    }
  }
}, 2000)

/**********************************Fin factura ********************************/

/*********PROGRESS BAR*********/

const progressBars = () => {
  const container = document.querySelector('.container-main')
  const progressBarContainer = document.createElement('div')
  progressBarContainer.classList.add('progress--bar-container')

  const barsDescriptions = [
    { name: 'Carrito', imageSrc: '/arquivos/Icono-Carrito.svg', url: '#/cart', className: 'cart-bar' },
    { name: 'Información', imageSrc: '/arquivos/info1.svg', url: '#/profile', className: 'profile' },
    { name: 'Envío', imageSrc: '/arquivos/envio1.svg', url: '#/shipping', className: 'shipping' },
    { name: 'Pago', imageSrc: '/arquivos/pago1.svg', url: '#/payment', className: 'payment' },
  ]

  function createElements(obj) {
    const progressBarDescription = obj.map((item) => {
      const progressBarSection = document.createElement('div')
      progressBarSection.classList.add('progress--bar-section')

      progressBarSection.dataset.url = item.url

      const progressBar = document.createElement('div')
      progressBar.classList.add('progress--bar-bar')
      progressBar.classList.add(`${item.className}`)

      const createDiv = document.createElement('div')
      createDiv.classList.add('progress-bar-description')

      const image = document.createElement('img')
      image.src = item.imageSrc

      const name = document.createElement('p')
      name.innerHTML = item.name

      createDiv.append(image)
      createDiv.append(name)

      progressBarSection.append(createDiv)
      progressBarSection.append(progressBar)

      return progressBarSection
    })
    return progressBarDescription
  }

  const nodes = createElements(barsDescriptions)

  nodes.forEach((el) => {
    progressBarContainer.append(el)
  })

  container.prepend(progressBarContainer)
}

const changeUrlBars = () => {
  const bars = document.querySelectorAll('.progress--bar-section')
  bars.forEach((bar) => {
    bar.addEventListener('click', () => {
      const hash = bar.dataset.url
      location.hash = hash
    })
  })
}

const changeBarColor = () => {
  addTextCar()
  const hash = location.hash
  const bars = document.querySelectorAll('.progress--bar-section')

  bars.forEach((bar) => {
    if (bar.dataset.url === hash) {
      myLocation(bar.dataset.url)
    }
  })
}

const myLocation = (locationBar) => {
  $('.container-main .progress--bar-bar').removeClass('activeLocationBar')
  $('.container-main .progress-bar-description img').removeClass('activeLocationBar')

  switch (locationBar) {
    case '#/cart':
      document.querySelector('.container-main .progress--bar-bar.cart-bar').classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[0].classList.add('cart')
      document.querySelectorAll('.container-main .progress-bar-description img')[0].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].src = '/arquivos/info1.svg'
      document.querySelectorAll('.container-main .progress-bar-description img')[2].src = '/arquivos/envio1.svg'
      document.querySelectorAll('.container-main .progress-bar-description img')[3].src = '/arquivos/pago1.svg'
      break

    case '#/profile':
      document.querySelector('.container-main .progress--bar-bar.cart-bar').classList.add('activeLocationBar')
      document.querySelector('.container-main .progress--bar-bar.profile').classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[0].classList.add('cart')
      document.querySelectorAll('.container-main .progress-bar-description img')[0].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].classList.add('profile')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].src = '/arquivos/info2.svg'
      document.querySelectorAll('.container-main .progress-bar-description img')[2].src = '/arquivos/envio1.svg'
      document.querySelectorAll('.container-main .progress-bar-description img')[3].src = '/arquivos/pago1.svg'
      break

    case '#/shipping':
      document.querySelector('.container-main .progress--bar-bar.cart-bar').classList.add('activeLocationBar')
      document.querySelector('.container-main .progress--bar-bar.profile').classList.add('activeLocationBar')
      document.querySelector('.container-main .progress--bar-bar.shipping').classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[0].classList.add('cart')
      document.querySelectorAll('.container-main .progress-bar-description img')[0].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].classList.add('profile')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[2].classList.add('shipping')
      document.querySelectorAll('.container-main .progress-bar-description img')[2].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].src = '/arquivos/info2.svg'
      document.querySelectorAll('.container-main .progress-bar-description img')[2].src = '/arquivos/envio2.svg'
      document.querySelectorAll('.container-main .progress-bar-description img')[3].src = '/arquivos/pago1.svg'

      break

    case '#/payment':
      document.querySelector('.container-main .progress--bar-bar.cart-bar').classList.add('activeLocationBar')
      document.querySelector('.container-main .progress--bar-bar.profile').classList.add('activeLocationBar')
      document.querySelector('.container-main .progress--bar-bar.shipping').classList.add('activeLocationBar')
      document.querySelector('.container-main .progress--bar-bar.payment').classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[0].classList.add('cart')
      document.querySelectorAll('.container-main .progress-bar-description img')[0].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].classList.add('profile')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[2].classList.add('shipping')
      document.querySelectorAll('.container-main .progress-bar-description img')[2].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[3].classList.add('payment')
      document.querySelectorAll('.container-main .progress-bar-description img')[3].classList.add('activeLocationBar')
      document.querySelectorAll('.container-main .progress-bar-description img')[1].src = '/arquivos/info2.svg'
      document.querySelectorAll('.container-main .progress-bar-description img')[2].src = '/arquivos/envio2.svg'
      document.querySelectorAll('.container-main .progress-bar-description img')[3].src = '/arquivos/pago2.svg'
      break
  }
}

window.addEventListener('DOMContentLoaded', () => {
  progressBars()
})

window.addEventListener('load', () => {
  setTimeout(() => {
    changeUrlBars()
    changeBarColor()
  }, 2000)
})

window.addEventListener('hashchange', () => {
  changeBarColor()
})

/*******FINISH PURCHASE BUTTON********/

/*******start add cart text function********/

const addTextCar = () => {
  if ($('tbody .product-item').length > 0 && $('.container-message--car').length === 0) {
    $('.checkout-container.row-fluid.cart-active').prepend("<div class='container-message--car'>Tu Carrito</div>")
    $('.checkout-container.row-fluid.cart-active').removeClass('empty')
  } else {
    if ($('tbody .product-item').length === 0) {
      $('#container-progressbar, #warning-message , .message-bar ').remove()
      $('.checkout-container.row-fluid.cart-active').addClass('empty')
    }
  }
}

/*******end add cart text function********/

$(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
  addTextCar();
  displayWarningMessage();

  if (orderForm.value > 0) {
    $('#container-progressbar, #warning-message , .message-bar').remove()
    const costoEnvioArray = orderForm.totalizers
    let costoEnvioDecimal = ' '
    const costoEnvioTotal = () => {
      costoEnvioArray.forEach(function (el, index) {
        if (orderForm.totalizers[index].name == 'Costo total del envío')
          costoEnvioDecimal = orderForm.totalizers[index].value
      })
      return costoEnvioDecimal / 100
    }
    let precioBase = orderForm.value / 100
    let range
    range = precioBase - costoEnvioTotal()
    let percentbar = (range / 55000) * 100

    $('.summary-template-holder').append(
      "<div id='container-progressbar'><div id='progressbar'><p id='icon'></p><div></div></div></div><div id='warning-message' class='warning-message'></div>"
    )

    if (range <= 54000) {
      let valor = 55000 - range

      valor = new Intl.NumberFormat('de-DE').format(valor)

      $('#progressbar > div').css('width', percentbar + '%')

      $('#container-progressbar').append(`<p class="message-bar">¡Solo te quedan <span>$ ${valor}</span>!</p>`)
    }

    if (range >= 55000) {
      $('#progressbar, .message-bar ').remove()

      $('#container-progressbar').append(`<p class="message-bar">¡Ya tienes envío gratis!</p>`)
    }
  } else {
    $('.container-message--car').remove()
  }

  // const msg = $('<p>').text('DEBIDO A LAS FUERTES LLUVIAS, ESTAREMOS PRESENTANDO RETRASOS EN LAS ENTREGAS');
  // msg.css('marginTop', '10px')
  // $('#container-progressbar').append(msg)
})

function displayWarningMessage() {

  fetch('/files/config-warning-message.json')
    .then((response) => response.json())
    .then((response) => {

      const warningMessageState = response.WarningMessageState;
      const warningMessage = response.WarningMessage;
      let colorText = response.colorText;

      if (typeof colorText !== 'string' || colorText.trim() === '') {
        colorText = '#000000';
      }

      const warningContainer = document.getElementById('warning-message');

      warningContainer.innerHTML = '';

      if (warningMessageState && warningMessage.trim() !== "") {

        const messageElement = document.createElement('p');
        messageElement.textContent = warningMessage;
        messageElement.style.color = colorText;

        warningContainer.append(messageElement);
      }
    })
    .catch((error) => {
      console.error('Error al obtener el JSON:', error);
    });
}

// start function to show the check list to accept the terms and conditions

$(window).load(() => {
  $('#payment-data-submit:last-child').addClass('disabled')
  $(
    '<button id="payment-data-submit-fake" onclick="acceptTyC()" class="btn-block btn-large" tabindex="200"> <i class="icon-lock"></i> <span>Comprar ahora</span> </button>'
  ).insertBefore($('.payment-confirmation-wrap'))

  var $CheckTyC = $('<div class="text-left" id="TyCcheck"><input type="checkbox" class="form-check-input" id="exampleCheck1"><label for="exampleCheck1"> Declaro que he leído y aceptado los <a href="/terminos-condiciones" target="_blank"style="color:#244486">Términos y Condiciones Generales</a></label><span class="campo-requerido">Acepta términos y condiciones para continuar</span></div>'
  )
  $CheckTyC.appendTo($('.orderform-template .cart-totalizers'))

  $($CheckTyC).hide()

   var $CheckPromo = $('<div class="text-left" id="TyCcheck2"><input type="checkbox" class="form-check-input" id="exampleCheck2"><label for="exampleCheck2"> Declaro que he leído y aceptado los <a href="/legales-promociones" target="_blank"style="color:#244486">Términos y Condiciones de la Promoción</a></label><span class="campo-requerido">Acepta términos y condiciones para continuar</span></div>'
  )
  $CheckPromo.appendTo($('.orderform-template .cart-totalizers'))

  $($CheckPromo).hide()

  $('.container-order-form').on('focusin', function () {
    $($CheckTyC).show()
    $($CheckPromo).show()
  })

  $('.payment-confirmation-wrap').show()
  $('#payment-data-submit-fake').hide()
  nextStep()
})

function nextStep() {

  function isChecked () {
    if ($("#exampleCheck1").prop('checked') && $("#exampleCheck2").prop('checked')) {

      document.querySelector('#payment-data-submit:last-child').classList.remove('disabled');
      document.querySelector('.payment-confirmation-wrap').style.display = 'block';
      document.getElementById('payment-data-submit-fake').style.display = 'none';
      document.querySelectorAll('.msjCheck').forEach(element => {
        element.style.display = 'none';
      });
      document.querySelectorAll('.campo-requerido').forEach(element => {
        element.style.display = 'none';
      });
    }else {
      document.querySelector('#payment-data-submit:last-child').classList.add('disabled');
      document.querySelectorAll('.campo-requerido').forEach(element => {
        element.style.display = 'block';
      });
    }
  }
  const checkTC = document.querySelector('#exampleCheck1');
  const checkPromo = document.querySelector('#exampleCheck2');

  checkTC.addEventListener("change", function(event) {
    isChecked();
  })

  checkPromo.addEventListener("change", function(event) {
    isChecked();
  })

}

// end function to show the check list to accept the terms and conditions

$(function () {
  // regionesOut()
})

$(function () {
  // comunasOut()
})

const regionesOut = () => {
  const regionesModificadas = ['RegiondelLibertadorGeneralBernardoO’Higgins(VI)', 'RegiondeAysendelGeneralCarlosIbanezdelCampo(XI)', 'RegiondeMagallanesylaAntarticaChilena(XII)'];

  setInterval(function () {
    $('#ship-state option').each(function () {
      const valorRegion = $(this).val().replace(/\s/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if ($.inArray(valorRegion, regionesModificadas) >= 0) {
        if ($(this).attr('disabled') != 'disabled') {
          if(valorRegion === regionesModificadas[0] ){
            // $(this).text('Región de O’ Higgins (VI)').val('Región de O’ Higgins (VI)');
            $(this).val('Región de O’ Higgins (VI)');
          }
          if(valorRegion === regionesModificadas[1] ){
            $(this).val('Región de Aysén (XI)');
          }
            if(valorRegion === regionesModificadas[2] ){
            $(this).val('Región de Magallanes (XII)');
          }
        }
      }
    });
  }, 2500)
}


/*  start  function to remove the department from the selector */

const comunasOut = () => {
  const comunas = [
    'Centro de Ski - El Colorado___7690002',
    'Centro de Ski - Farellones___7690003',
    'Centro de Ski - La Parva___7690004',
    'Centro de Ski - La Parva___7690004',
    'Centro de Ski - Valle Nevado___7690001',
    'Chicureo___9350001',
    'Lo Barnechea (Excepto Cordillera)___7690100',
    'Caleta Hornos___1780008',
    'Guanaqueros___1780007',
    'Las Tacas___1780002',
    'Morrillos___1780004',
    'Playa Blanca___1780003',
    'Puerto Velero___1780001',
    'Tongoy___1780006',
    'Totoralillo___1780005',
    'Santa María___2200000',
    'Lirquen___4140001',
    'Recinto___3880001',
    'Corralco___4780002',
    'Lago Cólico___4930002',
    'Licanray___4930001',
    'Malalcahuello___4780001',
    'Ensenada___5550001',
    'Lago Rapel___3030001',
    'Isla De Pascua___2770000',
    'Caburga___4920001',
    'Calafquen___4930001',
    'Licanray___4930001',
    'Lago Cólico Norte___4890001',
    'Lago Cólico Sur___4890002',
    'Dichato___4160001',
    'Lirquen___4140001',
    'Pingueral___4160002',
    'El Islote___5370001',
    'Marina Rupanco___5360001',
    'Antártica___6360000',
    'Coñaripe___5210001',
    'Putre___1070000',
    'Camiña___1150000',
    'Colchane___1160000',
    'Ollagüe___1420000',
    'Colbún___3610000',
    'Tortel___6120000',
    'Timaukel___6320000',
  ]

  setInterval(function () {
    $('#ship-neighborhood option').each(function () {
      if ($.inArray($(this).val(), comunas) > 0) {
        if ($(this).attr('disabled') != 'disabled') {
          $(this).hide()
          $(this).attr('disabled', 'disabled')
        }
      }

      if ($(this).val() == 'Centro de Ski - El Colorado___7690002') {
        if ($(this).attr('disabled') != 'disabled') {
          $(this).hide()
          $(this).attr('disabled', 'disabled')
        }
      }
    })

    $('#ship-state').bind('change', function () {
      setTimeout(function () {
        $('#ship-neighborhood option').each(function () {
          if ($.inArray($(this).val(), comunas) > 0) {
            if ($(this).attr('disabled') != 'disabled') {
              $(this).hide()
              $(this).attr('disabled', 'disabled')
            }
          }

          if ($(this).val() == 'Centro de Ski - El Colorado___7690002') {
            if ($(this).attr('disabled') != 'disabled') {
              $(this).hide()
              $(this).attr('disabled', 'disabled')
            }
          }
        })
      }, 300)
    })
  }, 2500)
}

/*  end function to disable some communes from the list */

/*City Null Fix*/

$(document).ready(function () {
  $(window).on('hashchange', function () {
    if (window.location.hash.includes('payment')) {
      vtexjs.checkout.getOrderForm().then(function (orderForm) {
        var shippingData = orderForm.shippingData
        let neighborhood = shippingData?.address?.neighborhood
        shippingData.selectedAddresses[0].city = neighborhood
        return vtexjs.checkout.sendAttachment('shippingData', shippingData)
      })
    }
  })
})

const changePlaceHolders = () => {
  //$(".v-custom-product-item-wrap").contents().unwrap();
  $('#client-first-name').attr('placeholder', 'Nombre')
  $('#client-last-name').attr('placeholder', 'Apellido')
  $('#client-email').attr('placeholder', 'Correo')
  $('#client-document').attr('placeholder', 'Número de documento')
  $('#client-phone').attr('placeholder', 'Número teléfonico')
  $('#ship-street').attr('placeholder', 'Dirección')
  $('#ship-number').attr('placeholder', 'Numero')
  $('#ship-state').attr('placeholder', 'Seleccione una Región')
  $('#ship-receiverName').attr('placeholder', 'Persona que va a recibir')
  $('#ship-complement').attr('placeholder', 'Ej. 2A (opcional)')
  $('#creditCardpayment-card-0Code').attr('codigo)')

  let selectNameValidation = $('select[name=state] option:first').text()
  let selectCityValidation = $('select[name=city] option:first').text()

  if (selectNameValidation == '') {
    $('select[name=state] option:first').html('Seleccione una Región')
  }

  if (selectCityValidation == '') {
    $('select[name=city] option:first').html('Seleccione una Provincia')
  }

  if (selectCityValidation == '') {
    $('select[name=neighborhood] option:first').html('Seleccione una Comuna ')
  }
}

const limitAddressField = () => {
  $('#ship-street').attr('maxlength', '120')
}

const changeTarjetasIcons = () => {
  var tarjetaDebito = document.getElementsByClassName('tarjeta-debito')
  if (tarjetaDebito.length <= 0) {
    $('#payment-group-debitCardPaymentGroup').append(
      "<div class='tarjeta-debito'>" +
      "<span class='tarjetas-creditos'> <img id='mastercard' src='https://reebokcl.vteximg.com.br/arquivos/mastercard.svg' /> </span>" +
      "<span class='tarjetas-creditos'> <img id='visa' src='https://reebokcl.vteximg.com.br/arquivos/Visa.svg' /> </span>" +
      '</div>'
    )
  }

  var tarjetaCredito = document.getElementsByClassName('tarjeta-agregada')
  if (tarjetaCredito.length <= 0) {
    $('#payment-group-creditCardPaymentGroup').append(
      "<div class='tarjeta-agregada'>" +
      "<span class='tarjetas-creditos'> <img id='american' src='https://reebokcl.vteximg.com.br/arquivos/american.svg' /> </span>" +
      "<span class='tarjetas-creditos'> <img id='dinners' src='https://reebokcl.vteximg.com.br/arquivos/dinners.svg' /> </span>" +
      "<span class='tarjetas-creditos'> <img id='mastercard' src='https://reebokcl.vteximg.com.br/arquivos/mastercard.svg' /> </span>" +
      "<span class='tarjetas-creditos'> <img id='visa' src='https://reebokcl.vteximg.com.br/arquivos/Visa.svg' /> </span>" +
      '</div>'
    )
  }

  $('#payment-group-creditCardPaymentGroup .payment-group-item-text').text('Tarjetas de Crédito, Débito o Prepago.')
  var pagoDebito = document.getElementsByClassName('payment-group-item-text')
  if (pagoDebito.length <= 0) {
    $('#payment-group-debitCardPaymentGroup').append(
      "<div class='pago-debito'>" +
      "<span class='tarjetas-creditos'> <img id='mastercard' src='https://reebokcl.vteximg.com.br/arquivos/mastercard.svg' /> </span>" +
      "<span class='tarjetas-creditos'> <img id='visa' src='https://reebokcl.vteximg.com.br/arquivos/Visa.svg' /> </span>" +
      '</div>'
    )
  }

  $('#payment-group-custom201PaymentGroupPaymentGroup .payment-group-item-text').text(
    'Efectivo o Transferencia Electrónica'
  )
  var pagoEfectivo = document.getElementsByClassName('pago-efectivo')
  if (pagoEfectivo.length <= 0) {
    $('#payment-group-custom201PaymentGroupPaymentGroup').append(
      "<div class='pago-efectivo'>" +
      "<span class='pago-efectivo'> <img id='pagoefectivo' src='https://reebokcl.vteximg.com.br/arquivos/klap.svg' /> </span>" +
      '</div>'
    )
  }
}

const checking = () => {
  let cont = 0

  if (window.location.href.includes('checkout/#/shipping') || window.location.href.includes('checkout/#/payment')) {
    let id = setInterval(function () {
      changePlaceHolders()
      changeTarjetasIcons()
      limitAddressField()

      cont++

      if (cont > 3 && ($('#ship-street').length > 0 || $('.step.accordion-group.store-country-COL.active').length > 0))
        clearInterval(id)
    }, 1500)
  }
}

window.addEventListener('hashchange', () => {
  checking()
})

$(document).ajaxStop(function () {
  checking()
})

// Código enviado por mercadopago
var script = document.createElement("script");
script.src = "https://www.mercadopago.com/v2/security.js";
script.setAttribute("output","vtex.deviceFingerprint");
script.setAttribute("view","checkout");
document.body.appendChild(script);
// FIN Código enviado por mercadopago


const productModal = () => {
  if (!$('.productModal').length) {
      $('body').append(`
          <div class="productModal">
              <div class="productModalContainer">
                  <div class="closeModal"></div>
              </div>
          </div>
      `);

      $(document).on('click', '.productModal .productModalContainer', function (e) {
          e.stopPropagation();
      });

      $(document).on('click', '.productModal .productModalContainer .closeModal', function (e) {
          e.stopPropagation();
          $('.productModal').trigger('click');
          $('.productModal').fadeOut(function () {
              $(this).hide();
          });
      });
  }
}

// Call the productModal function when the document is ready
$(document).ready(function () {
   /*toggleCheckoutGifBg(); se comenta gif rojo que gatilla modal */
  $('.checkout-gif').on('click', function() {
    $(".productModal").fadeIn().css({display: "flex"})
 })
  if (window.location.href.includes("/checkout/#/cart")) {
    //productModal();
    $(window).on('load', function () {
      $('.productModal').fadeIn().css('display', 'flex');
  });
}
});

var suggestion = document.createElement("script");
suggestion.src = "/files/suggestions.js";
document.body.appendChild(suggestion);

function getGifts(selectableGifts) {
  selectableGifts.length || $('.new-box-gifts').remove();
  setTimeout(function () {
    buildGifts(selectableGifts);
  }, 300);
  $('.alert-sku').removeClass('show');
}

$(window).on('orderFormUpdated.vtex', function (event, orderForm) {
  getGifts(orderForm.selectableGifts)
})

function groupBy(e, o) {
  return e.reduce(function (e, a) {
    var t = o instanceof Function ? o(a) : a[o],
      i = e.find(function (e) {
        e && e.key
      })
    return (
      i
        ? i.values.push(a)
        : e.push({
            key: t,
            name: a.name,
            img: a.imageUrl,
            index: a.index,
            values: [a],
            id: a.id,
            isSelected: a.isSelected,
          }),
      e
    )
  }, [])
}

const criaSku = (skus, key, priceTagsIdentifier) => {
  const orderMap = ["XS", "S", "M", "L", "XL"]

  const customSort = (a, b) => {
    const indexA = orderMap.indexOf(a)
    const indexB = orderMap.indexOf(b)
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  };

  const removeDuplicateSku = (arr) => {
    const seen = new Set()
    return arr.filter((item) => {
      const id = item.values[0].id
      if (seen.has(id)) {
        return false
      } else {
        seen.add(id)
        return true
      }
    })
  }

  return removeDuplicateSku(skus).map((item, index) => {
    let size = item.name.split("|").pop().split(" ").pop() || 'U';

    if (size.length || key === item.key) {
      return  {
        size: size,
        option: `<li
                  class="available-gift-item select-gift inactive"
                  data-item-id="${item.id}"
                  data-item-seller="1"
                  data-item-index="${index}"
                  data-gift-list-id="
                    ${priceTagsIdentifier}"
                >
                  ${size}
                </li>`
      }
    }
  }).sort((a, b) => customSort(a.size, b.size)).map(item => item.option).join("");
}

const buildGifts = (selectableGifts) => {
  document.querySelectorAll('.new-box-gifts').forEach((box) => box.remove())

  selectableGifts.forEach((giftGroup) => {
    const groupedGifts = groupBy(giftGroup.availableGifts, 'productId')
     const canChoose = selectableGifts[0]?.canChoose?.count
    const message = canChoose ? `Selecciona un Regalo, tienes ${canChoose} disponible/s` : `Todos los regalos han sido seleccionados!`

    if (!document.querySelector(`.new-box-gifts[data-brinde-id="${giftGroup.id}"]`)) {
      const placeholder = document.querySelector('.cart-select-gift-placeholder')
      const newBox = document.createElement('div')
      newBox.className = 'new-box-gifts'
      newBox.dataset.brindeId = giftGroup.id
      newBox.innerHTML = '<div class="navBrinde"></div>'
      placeholder.insertAdjacentElement('afterend', newBox)
    }

    let currentKey = ''
    const lastGiftIndex = groupedGifts.length - 1
    const navBrinde = document.querySelector(`.new-box-gifts[data-brinde-id="${giftGroup.id}"] .navBrinde`)

    groupedGifts.forEach((gift, giftIndex) => {
      let productName = gift.name.split(' ')
      if (productName.length > 1) {
        productName = productName.slice(0, -1).join(' ')
      } else {
        productName = gift.name
      }

      if (currentKey !== gift.key) {
        const boxGifts = document.createElement('div')
        boxGifts.className = 'boxGifts'
        boxGifts.dataset.productId = gift.key
        boxGifts.innerHTML = `
            <div class="boxButton"></div>
            <div class="boxImg"><img src="${gift.img}" /></div>
            <div class="boxTitle"><p>${productName}</p></div>
            <div class="boxSkus"><ul>${criaSku(groupedGifts, gift.key, giftGroup.id)}</ul></div>
            <div class="gift-box-item-selector-container" style="width: 100%;">
              <button
                class="gift-box-item-selector"
                style="
                  color: #fff;
                  background: #121212;
                  border: none;
                  height: 45px;
                  padding: 0 20px;
                  border-radius: 0px;
                  font-size: 14px;
                  margin-top: 10px;
                  width: inherit;"
              >
                Seleccionar
              </button>
            </div>
          `
        navBrinde.appendChild(boxGifts)
        currentKey = gift.key
      }

      if (lastGiftIndex === giftIndex) {
        const newBox = document.querySelector(`.new-box-gifts[data-brinde-id="${giftGroup.id}"]`)
        const header = document.createElement('h2')
        header.className = 'available-gift-quantity title-mid-size all-gifts-were-chosen'
        header.textContent = message
        newBox.insertAdjacentElement('afterbegin', header)
      }
    })
  });

  ;(() => {
    const selectGift = document.querySelector('.gift-box-item-selector');
    if(selectGift){
      selectGift.style.opacity = 0.4;
      selectGift.style.pointerEvents = 'none';
      selectGift.disabled = true;
    }

    const boxGifts = document.querySelector('.boxGifts');
    const canChoose = selectableGifts[0]?.canChoose?.count
    if(!canChoose && boxGifts){
      boxGifts.style.opacity = 0.5
      boxGifts.style.pointerEvents = 'none';
      boxGifts.disabled = true
    }

    const boxSkus = document.querySelectorAll('.boxSkus ul li')
    let skuId = 0

    if (boxSkus) {
      boxSkus.forEach((sku) => {
        sku.addEventListener('click', () => {
          boxSkus.forEach((skus) => {
            skus.classList.remove('active')
            skus.classList.add('inactive')

            if(!canChoose){
              skus.style.pointerEvents = 'none';
              skus.disabled = true
            }
          })

          sku.classList.add('active')
          skuId = sku.getAttribute('data-item-id')
          if(skuId){
            selectGift.style.opacity = 1;
            selectGift.style.pointerEvents = 'auto';
            selectGift.disabled = false;
          }
        })
      })
    }

    document.querySelector('.gift-box-item-selector')?.addEventListener('click', () => {
      const giftId  = selectableGifts[0].id
      const available = selectableGifts[0].availableQuantity
      const current = selectableGifts[0].currentGifts.count
      const gifts = selectableGifts[0].selectedGifts

      if(skuId){
        if(current < available) {
          vtexjs.checkout.updateSelectableGifts(giftId, [...gifts, {id: skuId, index: current, seller: 1}])
        }
      }
    })
  })()
}
function createModal() {
  $('.alert-sku').length || $('body').prepend('<div class="alert-sku"></div>'),
    $('.alert-sku').addClass('show'),
    setTimeout(function () {
      $('.alert-sku').removeClass('show')
    }, 3e3)
}

function loadScript(e) {
  var a = document.createElement('script'),
    t = !1,
    i = document.getElementsByTagName('head')[0]
  ;(a.src = e),
    (a.onload = a.onreadystatechange =
      function () {
        t ||
          (this.readyState && 'loaded' != this.readyState && 'complete' != this.readyState) ||
          ((t = !0), (a.onload = a.onreadystatechange = null), i.removeChild(a))
      }),
    i.appendChild(a)
}

function loadCarrossel(e) {
  setTimeout(function () {
    e.addClass('owl-carousel')
    e.addClass('owl-theme')
    const xoul = setInterval(() => {
      if (e.owlCarousel) {
        e.owlCarousel({
          items: 4,
          margin: 24,
          nav: !0,
          dots: !1,
          responsiveRefreshRate: !0,
          responsiveClass: !0,
          responsive: {
            0: { items: 1, dots: !0 },
            370: { items: 2, dots: !0 },
            600: { items: 3, dots: !0 },
            1200: { items: 4, dots: !0 },
          },
        })
        clearInterval(xoul)
      }
    }, 500)
  }, 700)
}

function progressBar() {
  $('<div class="regua"><i class="icone"></i><p></p><div class="progress"></div></div>').insertAfter($('header'))
}
function formatReal(e) {
  return ((e = e.toFixed(2).split('.'))[0] = e[0].split(/(?=(?:...)*$)/).join('.')), e.join(',')
}
function qtdMaxItem() {
  $('.cart-template .product-item').each(function () {
    10 <= $(this).find('.quantity input').val()
      ? $(this).find('.item-quantity-change-increment').addClass('inativo')
      : $(this).find('.item-quantity-change-increment').removeClass('inativo')
  })
}
function utagData(e, a, t, i) {
  window.utag_data = []
  var o = '',
    r = '',
    n = []
  ;(o = localStorage.getItem('logged') ? 'logged in' : 'not logged in'),
    (r = innerWidth <= 767 ? 'mobile' : 767 < innerWidth && innerWidth <= 1024 ? 'tablet' : 'desktop'),
    e.items.forEach(function (e) {
      var a = e.name.split(' - ')
      n.push({
        id: e.id,
        master_id: e.productId,
        name: e.name,
        category: e.productCategories,
        giftset_id: '',
        quantity: e.quantity,
        size: a[1],
        price: e.price,
      })
    }),
    (utag_data = {
      currency: 'co',
      customer_crm_id: e.userProfileId,
      customer_login_status: o,
      page_content_id: '',
      page_name: a,
      page_type: t,
      site_id: 'es-co',
      site_section_levels_id: '',
      user_device_type: r,
      page_items: e.items.length,
      products: n,
      estore_event: [i],
    })
}
function utagDataQuantity() {
  $('.cart-template .product-item').each(function () {
    var t = $(this)
    $(this)
      .find('.item-quantity-change-increment')
      .on('click', function () {
        var e = vtexjs.checkout.orderForm.items.filter(function (e) {
            return e.id === t.attr('data-sku')
          }),
          a = e[0].name.split(' - ')
        utag.link({
          estore_event: ['product add to cart'],
          products: [
            {
              id: e[0].id,
              master_id: e[0].productId,
              name: e[0].name,
              category: e[0].productCategories,
              giftset_id: '',
              quantity: e[0].quantity,
              size: a[1],
              price: e[0].price,
              finding_method: 'cart',
            },
          ],
        })
      }),
      $(this)
        .find('.item-link-remove')
        .on('click', function () {
          var e = vtexjs.checkout.orderForm.items.filter(function (e) {
              return e.id === t.attr('data-sku')
            }),
            a = e[0].name.split(' - ')
          utag.link({
            estore_event: ['product remove from cart'],
            products: [
              {
                id: e[0].id,
                master_id: e[0].productId,
                name: e[0].name,
                category: e[0].productCategories,
                giftset_id: '',
                quantity: e[0].quantity,
                size: a[1],
                price: e[0].price,
                finding_method: 'cart',
              },
            ],
          })
        })
  })
}
$(window).on('load', function () {
  loadScript('//reebokcol.vteximg.com.br/arquivos/new-owl.carousel.min.js'),
    '#/profile' == window.location.hash && checkboxCustomProfile(),
    $(window).on('orderFormUpdated.vtex', function (e, a) {
      qtdMaxItem(), utagDataQuantity()
    })//,
    //selectSku()
}),
  (window.onload = function () {
    $('.client-email.text > span').length ? $('.client-email.text > span').html() : $('input#client-email').val(),
      '#/cart' == window.location.hash && progressBar(),
      0 < window.location.search.indexOf('EVOPANDORA-122') &&
        utagData(vtexjs.checkout.orderForm, 'basket', 'cart', 'Cart viewed'),
      $('div.cart-template.mini-cart.span4 > div').removeClass('affix'),
      $(window).scroll(function () {
        10 < $(window).scrollTop()
          ? $('div.cart-template.mini-cart.span4 > div').addClass('affix')
          : $('div.cart-template.mini-cart.span4 > div').removeClass('affix')
      })
  }),
  $(window).on('hashchange', function () {
    '#/cart' == window.location.hash
      ? (progressBar(), getGifts(vtexjs.checkout.orderForm.selectableGifts))
      : ($('.regua').remove(), $('.new-box-gifts').remove(), $('.alert-sku').remove(), $('.aviso-brindes').remove());
  })

/* Fin promo prueba */

function toggleCheckoutGifBg() {

  if (window.location.hash === '#/cart') {
    let summaryTemplateHolder = document.querySelector('.summary-template-holder');
    let checkoutGifBg = document.createElement('div');
    checkoutGifBg.id = 'checkout-gif-bg';
    let checkoutGif = document.createElement('img');
    checkoutGif.className = 'checkout-gif';
    checkoutGif.src = '/arquivos/BANER-ENCUENTRALOS-AQUI-2.gif';
    checkoutGifBg.appendChild(checkoutGif);
    summaryTemplateHolder.appendChild(checkoutGifBg);
  }

}

// Ajustes cupón
function applyCustomStyle() {
  const customMsgElement = document.querySelector('.js-vcustom-showCustomMsgCoupon');
  const checkoutGifElements = document.querySelectorAll('.checkout-gif');

  if (window.matchMedia('(max-width: 40rem)').matches) {
    checkoutGifElements.forEach(element => {
      if (customMsgElement) {
        element.style.setProperty('bottom', '540px', 'important');
      } else {
        element.style.setProperty('bottom', '480px', 'important');
      }
    });
  } else {

    checkoutGifElements.forEach(element => {
      element.style.removeProperty('bottom');
    });
  }
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList' || (mutation.type === 'attributes' && mutation.attributeName === 'class')) {
      applyCustomStyle();
    }
  });
});


applyCustomStyle();


observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class']
});


window.addEventListener('resize', applyCustomStyle);

// fin Ajustes cupón
