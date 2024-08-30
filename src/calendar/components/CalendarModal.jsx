import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { addHours, differenceInSeconds } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUIStore } from "../../hooks/useUIStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export const CalendarModal = () => {

  const{isDateModalOpen,closeDateModal} = useUIStore()
  const {activeEvent,startSavingEvent}= useCalendarStore()
  const [fromSubmitted, setFromSubmitted] = useState(false)

  const [formValues, setformValues] = useState({
    id:'',
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

   const titleClass= useMemo(()=>{
      if(!fromSubmitted)return '';
      return(formValues.title.length>0)
      ?'is-valid'
      :'is-invalid'
      
   },[fromSubmitted])

   useEffect(() => {
    if(activeEvent !==null){
      setformValues({...activeEvent})
    }
    
   }, [activeEvent])
   

  const onInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onCloseModal = () => {
    console.log("cerrar modal");
    closeDateModal()
  };
  const onDateChanged = (event, changing) => {
    setformValues({
      ...formValues,
      [changing]: event,
    });
  };
  const onSubmitModal = async(event) => {
    event.preventDefault();
    const differente = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(differente) || differente <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas')
      return;
    }
    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues)
    closeDateModal()
    setFromSubmitted
  };
  return (
    <Modal
      isOpen={isDateModalOpen}
      className="modal"
      overlayClassName="modal-fondo"
      onRequestClose={onCloseModal}
      closeTimeoutMS={200}
      style={customStyles}
      
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmitModal}>
        <div className="form-group mb-2 myform">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, "start")}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2 myform">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            className="form-control"
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, "end")}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            onChange={onInputChange}
            value={formValues.title}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            onChange={onInputChange}
            value={formValues.notes}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
