import './Techs.css';

function Techs() {

    const techsCard = [
        {
            name: 'HTML',
            id: 1,
        },
        {
            name: 'CSS',
            id: 2,
        },
        {
            name: 'JS',
            id: 3,
        },
        {
            name: 'React',
            id: 4,
        },
        {
            name: 'Git',
            id: 5,
        },
        {
            name: 'Express.js',
            id: 6,
        },
        {
            name: 'mongoDB',
            id: 7,
        },
    ]

  return (
   <>  
      <div className="techs">
        <div className="techs__head">
             <p className="techs__head__text">Технологии</p>
        </div>
             <p className="techs__name">7 технологий</p>
             <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__container">
              {
                  techsCard.map((i) => {
                    return  <div key={i.id} className="techs__container__name"><p>{i.name}</p></div>
                  })
              }
        </div>
       </div>
   </>
  );
}

export default Techs;