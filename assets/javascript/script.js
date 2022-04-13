const cepInput = document.getElementById("cep-form__input");
const submitBtn = document.getElementById("cep-form__btn");
const cepContent = document.getElementById("cep-content");

submitBtn.addEventListener("click", getCepInfo);

function getCepInfo(event) {
  event.preventDefault();

  var zipCode = cepInput.value;

  zipCode = zipCode.replace(/ /g, "");
  zipCode = zipCode.replace(".", "");
  zipCode = zipCode.trim();

  axios
    .get("https://viacep.com.br/ws/" + zipCode + "/json/")
    .then(function (response) {
      if (response.data.erro) {
        throw new Error("CEP Inválido");
      }

      cepContent.innerHTML = "";
      createLine("Rua: " + response.data.logradouro);
      createLine(
        "Cidade: " + response.data.localidade + "/" + response.data.uf
      );
      createLine("Bairro: " + response.data.bairro);
    })
    .catch(function (error) {
      cepContent.innerHTML = "";
      console.log(error);
      createLine("Insira um CEP válido.");
    });
}

function createLine(text) {
  const p = document.createElement("p");
  p.innerText = text;
  cepContent.appendChild(p);
}
