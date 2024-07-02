
import classes from './Model.module.css';
function Modal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={classes.ModalOverlay} onClick={onClose}>
      <div className={classes.Modal}>
        <button className={classes.CloseButton} onClick={onClose}>X</button>
        <img src="https://s3-alpha-sig.figma.com/img/afe4/9163/c8cd31c37cf6a026d0c095699cebe9f2?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ejmNx5spIwCD57jjMYMDuj~57JtfRQGpLG4MGZgZ0HLNFmcKNx-AzmD0TtdCl6Rq1lo3MckrlYl4xkRk0zv8FvVUn6bJz6x9C3yhoPLhzPcndp7USeNGw-VdX9LAWR7ZdLu8OEJUpr3CHldC3YEqwaPPj2KjQpyoOz6ugz86A~9AFXR5gWcHKtRj1~F9a7xnyZMDixzj5qow1LfzpxLjtkkd1qZpbvss0~5legIqbfDLcFEDXgG468-wGH-UdN9qpqE8-N2s994wg9-rpWGzC23DRi-xdJSG6RGbtCfMoPosZi6-M5rWJ-xA0Mwv5niQ~~ppaGp5IfK1~hQ7hHNjLQ__" alt="Done" className={classes.ModalIcon} />
        <p className={classes.ModalText}>{message}</p>
      </div>
    </div>
  );
}

export default Modal;
