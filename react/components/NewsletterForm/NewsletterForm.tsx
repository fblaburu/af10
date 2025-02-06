import React, { useState } from "react";
import { Input } from "./components";
import MasterData from "./services/MasterData";
import styles from "./styles.css";

const dataFields = {
  name: {
    type: "text",
    name: "name",
    placeholder: "Nombre",
    label: ""
  },
  date: {
    type: "date",
    name: "date",
    placeholder: "Fecha de chumpleaños",
    label: ""
  },

  email: {
    type: "email",
    name: "email",
    placeholder: "Correo electrónico",
    label: ""
  },

  phone: {
    type: "number",
    name: "phone",
    placeholder: "Télefono",
    label: ""
  }
};

const initialDataForm = {
  email: "",
  name: "",
  phone: "",
  date: "",
  check: true
};
const initialErrorsDataForm = {
  email: "",
  name: "",
  phone: "",
  date: ""
};

interface NewsletterFormProps {
  __terms: "string";
  __textLink: "string";
  __link: "string";
  __btn: "string";
}

const NewsletterForm = ({
  __terms,
  __textLink,
  __link,
  __btn,
}: NewsletterFormProps) => {
  const masterData = new MasterData("NL");
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const updateCheckBox = (e: any) => {
    setCheckBox(e.target.checked);
  };

  const initialError = {
    status: false,
    valide: false,
    msg: "",
  };

  const [dataForm, setDataForm] = useState<any>(initialDataForm);
  const [errorsDataForm, setErrorsDataForm] = useState<any>(
    initialErrorsDataForm
  );
  const [error, setError] = useState<any>(initialError);
  const [submitResultText, setSubmitResultText] = useState("");

  const updateDataForm = (name: string, value: string) => {
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const clearErrorData = (name: string) => {
    setErrorsDataForm({
      ...errorsDataForm,
      [name]: "",
    });
  };

  const onChange = (
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const { name, value }: any = target;
    if (value !== "" && errorsDataForm[name] !== "") clearErrorData(name);

    updateDataForm(name, value);
  };

  const validateEmptyFields = () => {
    const errors: any = {};

    Object.keys(dataFields).forEach((name: string) => {
      if (dataForm[name] === "")
        errors[name] = "* Este campo no puede estar vacío";
    });

    return errors;
  };

  const updateSubmitResultText = (message: string) => {
    setSubmitResultText(message);
    setTimeout(() => {
      setSubmitResultText("");
    }, 5000);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const resultValidateEmptyFields = validateEmptyFields();

    if (checkBox === false) {
      setError({
        status: true,
        valide: false,
        msg: "Por favor acepta términos y condiciones",
      });
      setTimeout(() => setError(initialError), 2000);
      return;
    }

    if (Object.values(resultValidateEmptyFields).length) {
      setErrorsDataForm({
        ...errorsDataForm,
        ...resultValidateEmptyFields,
      });
      return;
    }
    const resSearchEmailInMD: any = await masterData.get(
      "email",
      dataForm.email
    );
    if (resSearchEmailInMD) {
      return updateSubmitResultText("Este email se encuentra en uso");
    }
    const resCreateDocument = await masterData.post(dataForm);
    if (!resCreateDocument) {
      updateSubmitResultText(
        "Ha ocurrido un error, por favor intenta de nuevo"
      );
    }
    const closeButton = document.querySelector('.vtex-modal-layout-0-x-closeButton') as HTMLButtonElement | null;

    setTimeout(() => {
      if (closeButton) {
        closeButton.click();
      }
    }, 6000);

    updateSubmitResultText("Información enviada correctamente");
    window.dispatchEvent(new CustomEvent("custom:newsletterSubmit"));
    setDataForm(initialDataForm);
  };

  return (
    <div className={`${styles.newsletterForm}`}>
      <form onSubmit={onSubmit}>
        <div>
          <div
            className={`flex relative ${styles.newsletterForm__section} ${styles.newsletterForm__nameAndFormalTitle}`}
          >
            <div>
              <Input
                name={dataFields.name.name}
                type={dataFields.name.type}

                placeholder={dataFields.name.placeholder}
                value={dataForm.name}
                onChange={onChange}
                /* error={errorsDataForm.name} */
                id={dataFields.name.label}
              />
            </div>

            <div className={`flex relative ${styles.newsletterForm__emailBtn}`}>

              <Input
                name={dataFields.email.name}
                type={dataFields.email.type}

                placeholder={dataFields.email.placeholder}
                value={dataForm.email}
                onChange={onChange}
                /* error={errorsDataForm.email} */
                id={dataFields.email.label}
              />
            </div>



            <div>

              <Input
                name={dataFields.phone.name}
                type={dataFields.phone.type}

                placeholder={dataFields.phone.placeholder}
                value={dataForm.phone}
                onChange={onChange}
                /* error={errorsDataForm.phone} */
                id={dataFields.phone.label}
              />
            </div>
            <div>
              <label style={{ color: '#000', fontSize: '13px', fontWeight: 'bold', lineHeight: 1.5 }}>Fecha de cumpleaños</label>
              <Input
                name={dataFields.date.name}
                type={dataFields.date.type}

                placeholder={dataFields.date.placeholder}
                value={dataForm.date}
                onChange={onChange}
                /* error={errorsDataForm.date} */
                id={dataFields.date.label}
              />
            </div>
          </div>

          <div className={styles.groupCheckBox}>
            <input
              type="checkbox"
              name="nl-radio"
              checked={checkBox}
              onChange={updateCheckBox}
              className={styles.checkBox}
              id="checkModal"
            />
            <label htmlFor="checkModal" className={styles.lblCheckbox}>
              {__terms}{" "}
              <a href={__link} target="_blank">
                {__textLink}
              </a>
            </label>
          </div>
          <div className={`flex relative ${styles.newsletterForm__emailBtn}`}>
            <button
              type="submit"
              className={`${styles.newsletterForm__submitButton}`}
            >
              {__btn}
            </button>
          </div>
          <p
            className={`${styles.newsletterForm__resultMessage} ${error.status && styles.showErrorNewsletter
              } ${error.valide ? styles.textColorValide : styles.textColorInValide
              }`}
          >
            {error.msg}
          </p>
          <p
            className={`tc ${styles.newsletterForm__resultMessage} ${submitResultText
              ? `${styles["newsletterForm__resultMessage--show"]}`
              : ""
              }`}
          >
            {submitResultText}
          </p>
        </div>
      </form>
    </div>
  );
};

NewsletterForm.defaultProps = {
  __terms: "Acepto los",
  __textLink: "términos y condiciones",
  __link: "/terminos-y-condiciones",
  __btn: "Enviar",
};

NewsletterForm.schema = {
  title: "Newsletter",
  description: "Configuración",
  type: "object",
  properties: {
    __terms: {
      title: "Términos y condiciones",
      type: "string",
    },
    __textLink: {
      title: "Texto Link",
      type: "string",
    },
    __link: {
      title: "Url Tyc",
      type: "string",
    },
    __btn: {
      title: "Texto Boton",
      type: "string",
    },
  },
};

export default NewsletterForm;
