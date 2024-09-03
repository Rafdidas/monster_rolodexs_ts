import './card-list.styles.css';
import Card from "../card/card.component";

const CardList = ({ monsters }) => {
    return (
        <div className="card-list">
            {
                monsters.map((monster) => {
                    return (
                        <Card monsters={monster} key={monster.id} />
                    )
                })
            }
        </div>
    );
}

export default CardList;