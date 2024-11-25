### MONSTER ROLODEX

#### typeScript 예제
- yarn add typescript @types/node @types/react @types/react-dom @types/jest
- tsconfig.json 추가

#### typeScript로 변경 작업

- search-box.component.tsx
- SearchBoxProps 에서 타입 정리

- className: string
- 검색 박스에 적용할 CSS 클래스 이름
- 필수 값이며, 부모 컴포넌트에서 문자열을 전달

- placeholder?: string
- 검색 박스에 표시될 힌트 텍스트
- 선택적 속성 (?로 표시), 제공하지 않아도 컴포넌트가 동작

- onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
- 입력 필드의 값이 변경될 때 호출되는 함수
- ChangeEvent<HTMLInputElement> 타입의 이벤트 객체를 인자로 받는 함수

```
import { ChangeEvent, } from 'react';

import './search-box.styles.css';

type SearchBoxProps = {
    className: string;
    placeholder?: string;
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ placeholder, className, onChangeHandler }: SearchBoxProps) => {
    return (
        <input 
            className={`search-box ${className}`} 
            type="search" 
            placeholder={placeholder}
            onChange={onChangeHandler} 
        />
    );
}

export default SearchBox;
```

- data.utils.tsx
- 이 함수는 제네릭 타입을 사용
- 호출 시 데이터의 타입을 명시적으로 지정할 수 있으므로, 타입 안전성을 유지하면서 다양한 데이터 구조를 처리

- 파라미터 (url: string)
- 데이터를 가져올 대상 URL을 string 타입으로 받습니다.

- 리턴 타입 (Promise<T>)
- 함수는 데이터를 비동기로 반환하며, 반환값은 Promise 객체
- 제네릭 타입 T를 통해 반환 데이터의 구조를 호출자가 미리 예측

```
export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return await response.json();
}
```

- card.component.tsx
- CardProps는 Card 컴포넌트의 props 타입을 정의
- monsters라는 단일 몬스터 객체를 props로 받으며, 이 객체는 Monster 타입을 따릅니다.

```
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
```

- card-list.component.tsx
- CardListProps는 Card 컴포넌트의 props 타입을 정의
- monsters는 Monster 타입 객체들의 배열(Monster[])입니다.
즉, 이 컴포넌트는 여러 몬스터 데이터를 한 번에 받아 처리

```
import './card-list.styles.css';

import Card from "../card/card.component";

import { Monster } from '../../App';

type CardListProps = {
    monsters: Monster[];
}

const CardList = ({ monsters }: CardListProps) => {
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
```

- card 와 card-list가 Monster[]와 Monster를 사용하는 이유는 각 컴포넌트가 처리하는 데이터의 범위가 다르기 때문

- Monster
- 단일 객체
- 예: { id: 1, name: "Dracula", email: "dracula@monsters.com" }

- Monster[]
- 객체 배열
- [
    { id: 1, name: "Dracula", email: "dracula@monsters.com" },
    { id: 2, name: "Frankenstein", email: "frank@monsters.com" },
    { id: 3, name: "Zombie", email: "zombie@monsters.com" }
]

- 왜 Card는 Monster를 받는가?
- Card는 개별 몬스터 하나만 처리합니다.
즉, Card 컴포넌트는 몬스터 배열이 아닌, 단일 몬스터(Monster) 객체를 받아야 합니다.

- 왜 CardList는 Monster[]를 받는가?
- CardList는 몬스터 여러 개를 처리하는 컴포넌트입니다.
즉, 하나의 몬스터가 아니라 몬스터의 배열(Monster[])을 받아야 모든 몬스터를 화면에 표시할 수 있습니다.

- CardList: 여러 몬스터의 배열(Monster[])을 처리해야 하므로 Monster[] 타입을 사용
- CardList: 여러 책이 있는 책장과 같습니다. → 책 배열(Monster[])을 받아 각 책을 처리
- Card: 개별 몬스터 하나(Monster)만 처리하므로 Monster 타입을 사용
- Card: 단일 책을 설명하는 책 소개 페이지와 같습니다. → 단일 책(Monster)만 처리