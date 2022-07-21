import './SectionTitle.css';

const SectionTitle = ({title, selector}) => {
    return(
      <>
        <h2 className={`section__title ${selector}`}>{title}</h2>
        <hr className={`section__line ${selector}`}/>
      </>
    )
}

export default SectionTitle;