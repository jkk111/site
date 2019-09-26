const EMAIL =
  "WzEwNiwxMTEsMTA0LDExMCw2NCwxMDYsMTExLDEwNCwxMTAsNDUsMTA3LDEwMSwxMTgsMTA1LDExMCw0NiwxMDksMTAxXQ==";

const attachCollapseHandlers = () => {
  const collapses = document.querySelectorAll(".heading");

  collapses.forEach(el => {
    el.addEventListener("click", () => {
      el.classList.toggle("collapsed");
    });
  });
};

const hookNav = () => {
  const navItems = document.querySelectorAll(".index-link");

  navItems.forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      document
        .querySelector(el.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
};

const handleSubmit = async event => {
  event.preventDefault();
  const form = event.target;

  const fd = new FormData();

  for (let i = 0; i < form.length; i++) {
    const { name, value } = form[i];
    fd.set(name, value);
  }

  const response = await fetch(form.action, {
    method: "POST",
    body: fd
  });
};

const hookForm = id => {
  const form = document.getElementById(id);
  form.addEventListener("submit", handleSubmit);
};

document.addEventListener("DOMContentLoaded", () => {
  attachCollapseHandlers();
  hookForm("contact-form");
  hookNav();
});

const getEmail = () => {
  const emailStr = atob(EMAIL);
  const emailArr = JSON.parse(emailStr);
  return emailArr.map(c => String.fromCharCode(c)).join("");
};

const showEmail = e => {
  e.preventDefault();
  try {
    const el = document.createElement("input");
    el.style.opacity = "0";
    el.value = getEmail();
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  } catch (error) {
    prompt("Ctrl + c to copy email", getEmail());
  }
};

const validateEmail = () => true;
