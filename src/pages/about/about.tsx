import React from 'react';
import ContentSite from '../../features/content/contnet-site';
import st from './about.module.css';
import comment from '../../access/images/comment.png';
import location from '../../access/images/location.png';
import list from '../../access/images/list.png';
import rating from '../../access/images/rating.png';

function About() {
    return (
        <ContentSite navbar={true}>
            <div className={st.titleBody}>
                <h1 className={st.title}>
                    TehnoTORG - один из лидеров рынка <br />
                    в области развития продаж цифровой <br />
                    электроники в России
                </h1>
                <p className={st.subtitle}>
                    Наша цель изменить жизнь людей, сделав простым доступ к
                    огромному количеству качественных и недорогих товаров,
                    предоставляя лучший сервис.
                </p>
            </div>
            <div className="row px-3 mt-5">
                <div className="col-12 col-lg-6">
                    <h2 className={st.listTitle}>Для клиентов</h2>
                    <ul className="mt-4">
                        <li className={st.listItem}>
                            Наши клиенты - в центре всего, что мы делаем,
                        </li>
                        <li className={st.listItem}>
                            Доверие - главное. Мы строим долгосрочные отношения,
                        </li>
                        <li className={st.listItem}>
                            Во всём, чем занимаемся, стремимся быть экспертами.
                        </li>
                        <li className={st.listItem}>
                            Оказываем лучший сервис для наших клиентов
                        </li>
                        <li className={st.listItem}>
                            Открыты для предложений и упучшений
                        </li>
                    </ul>
                </div>
                <div className="col-12 col-lg-6 ">
                    <h2 className={`${st.listTitle} ${st.noBorder}`}>
                        Для партнёров
                    </h2>
                    <ul className="mt-4">
                        <li className={st.listItem}>
                            Прозрачность - основа совместного бизнеса,
                        </li>
                        <li className={st.listItem}>
                            Работаем, соблюдая этику бизнеса
                        </li>
                        <li className={st.listItem}>
                            Уважаем другие мнения и интересы,
                        </li>
                        <li className={st.listItem}>
                            Находим уникальные решения для развития продаж.
                        </li>
                    </ul>
                </div>
            </div>
            <div className={st.description}>
                <h1 className={st.descriptionTitle}>
                    Стань частью команды <span>TehnoTORG</span>
                </h1>
                <p className={st.descriptionSubTitle}>
                    Вокруг нас люди, с которыми приятно работать и достигать
                    амбициозных целей, мы стараемся <span>объеденить</span>{' '}
                    единомышленников.
                </p>
            </div>
            <div className={st.steps}>
                <div className={st.stepItem}>
                    <div>
                        <img src={comment} alt="comment" />
                    </div>
                    <p className={st.text}>
                        Одним из первых знакомиться с новинками
                    </p>
                </div>
                <div className={st.stepItem}>
                    <div>
                        <img src={location} alt="comment" />
                    </div>
                    <p className={st.text}>
                        Огромное пространство возможностей
                    </p>
                </div>
                <div className={st.stepItem}>
                    <div>
                        <img src={list} alt="comment" />
                    </div>
                    <p className={st.text}>Постоянное обучение и развитие</p>
                </div>
                <div className={st.stepItem}>
                    <div>
                        <img src={rating} alt="comment" />
                    </div>
                    <p className={st.text}>
                        быстрый и прозрачный карьерный рост
                    </p>
                </div>
            </div>
        </ContentSite>
    );
}

export default About;
