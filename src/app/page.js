import ProjectForm from '../components/ProjectForm';

export default function Home() {
  return (
    <div>
      <div className="header">
        <h1 className="header__title">Производственные параметры фильма</h1>
        <button className="header__button">Отменить заполнение</button>
      </div>
      <ProjectForm />
    </div>
  );
}
