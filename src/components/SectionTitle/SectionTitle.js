import './SectionTitle.css';

const SectionTitle = ({title}) => {
    return(
      <>
        <h2 className="section__title">{title}</h2>
        <hr className="section__line"/>
      </>
    )
}

export default SectionTitle;