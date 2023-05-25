const EyeTracker = document.querySelectorAll("#EyeTracker button");
const BookDownload = document.querySelectorAll("#BookDownload button");
const ViewNormal = document.querySelectorAll("#ViewNormal button");

EyeTracker.forEach((button) => {
  button.addEventListener("click", async function () {
    let transactionBookName = this.getAttribute("data-value");
    let url = `http://localhost:4400/Link?bookName=${encodeURIComponent(
      transactionBookName
    )}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const redirectUrl = `visor.html?link=${encodeURIComponent(data.link)}`;
        window.location.href = redirectUrl;
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  });
});

const libroPredeterminado = async function () {
  let url = `http://localhost:4400/Link?bookName=Dracula`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data.link;
    } else {
      throw new Error("Error en la respuesta del servidor");
    }
  } catch (error) {
    console.error(error);
  }
};

BookDownload.forEach((button) => {
  button.addEventListener("click", async function () {
    let transactionBookName = this.getAttribute("data-value");
    let url = `http://localhost:4400/LinkDownload?bookName=${encodeURIComponent(
      transactionBookName
    )}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const link = document.createElement("a");
        link.href = data.link;
        link.download = transactionBookName;
        link.click();
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  });
});

ViewNormal.forEach((button) => {
  button.addEventListener("click", async function () {
    let transactionBookName = this.getAttribute("data-value");
    let url = `http://localhost:4400/Link?bookName=${encodeURIComponent(
      transactionBookName
    )}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        window.open(data.link);
      } else {
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error(error);
    }
  });
});
