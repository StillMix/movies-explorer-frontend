
import './AboutProject.css';


function AboutProject() {
  return (
   <> 
     <div className="aboutproject">

        <div className="aboutproject__head">
             <p className="aboutproject__head__text">О проекте</p>
        </div>

        <div className="aboutproject__container">
         <div className="aboutproject__element">
          <p className="aboutproject__element__name">Дипломный проект включал 5 этапов</p>
          <p className="aboutproject__element__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
         </div>
         <div className="aboutproject__element">
         <p className="aboutproject__element__name">На выполнение диплома ушло 5 недель</p>
          <p className="aboutproject__element__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
         </div>
         </div>

        <div className="aboutproject__scale">
            <div className="aboutproject__scale__element">
                <div className="scale__element__name">1 неделя</div>
                <p className="scale__element__text">Back-end</p>
            </div>
            <div className="aboutproject__scale__element">
                <div className="scale__element__name">4 недели</div>
                <p className="scale__element__text">Front-end</p>
            </div>
        </div>

     </div>
   </>
  );
}

export default AboutProject;