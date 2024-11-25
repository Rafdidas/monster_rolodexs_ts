import { Monster } from '../../App';

import './card.styles.css';

type CardProps = {
    monsters: Monster;
}

const Card = ({ monsters }: CardProps) => {
    const {id, name, email} = monsters;

    return(
        <div className="card-container">
            <img src={`https://robohash.org/${id}?set=set2&size=180x180`} alt={`monster ${name}`} />
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    );
}

export default Card;