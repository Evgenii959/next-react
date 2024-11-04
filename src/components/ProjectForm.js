'use client';

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';

const ProjectForm = () => {
  // Валидация формы с помощью Yup
  const validationSchema = Yup.object({
    projectName: Yup.string().required('Заполните поле'),
    genre: Yup.string().required('Выберите жанр'),
    format: Yup.string().required('Выберите формат'),
    unpNumber: Yup.string()
      .matches(/^\d{3}-\d{3}-\d{3}-\d{2}-\d{3}$/, 'Некорректный формат УНФ')
      .nullable(),
    country: Yup.string().required('Выберите страну'),
    budget: Yup.number().typeError('Должно быть числом').nullable(),
  });

  const formik = useFormik({
    initialValues: {
      projectName: '',
      genre: '',
      format: '',
      unpNumber: '',
      country: 'Россия', // по умолчанию Россия
      budget: '',
      synopsis: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Сохранение в localStorage и переход на следующий шаг
      localStorage.setItem('formData', JSON.stringify(values));
      alert('Данные сохранены!');
    },
  });

  // Подгрузка данных из localStorage при загрузке страницы
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      formik.setValues(savedData);
    }
  }, []);

  // Обработчик для контроля ввода УНФ
  const handleUnpChange = (event) => {
    const { value } = event.target;
    // Допустим, вы хотите добавить форматирование на лету
    const formattedValue = value.replace(/[^0-9-]/g, ''); // Удаляем все кроме цифр и дефисов
    formik.setFieldValue('unpNumber', formattedValue);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="form-container">
      <div className="input-wrapper">
        <div className="input-container">
          <div className="input">
            <label>Название проекта</label>
            <input
              type="text"
              name="projectName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.projectName}
            />
            {formik.touched.projectName && formik.errors.projectName && (
              <div className="error">{formik.errors.projectName}</div>
            )}
          </div>

          <div className="input">
            <label>Жанр</label>
            <select
              name="genre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.genre}
            >
              <option value="" label="Выберите жанр" />
              <option value="action" label="Экшен" />
              <option value="drama" label="Драма" />
              <option value="comedy" label="Комедия" />
            </select>
            {formik.touched.genre && formik.errors.genre && (
              <div className="error">{formik.errors.genre}</div>
            )}
          </div>

          <div className="input">
            <label>
              Формат (для онлайн-платформ, большого экрана, интернета, другое)
            </label>
            <select
              name="format"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.format}
            >
              <option value="" label="Выберите формат" />
              <option value="online" label="Онлайн-платформа" />
              <option value="cinema" label="Большой экран" />
              <option value="internet" label="Интернет" />
            </select>
            {formik.touched.format && formik.errors.format && (
              <div className="error">{formik.errors.format}</div>
            )}
          </div>

          <div className="input">
            <label>№ УНФ или отсутствует</label>
            <input
              type="text"
              name="unpNumber"
              value={formik.values.unpNumber}
              onChange={handleUnpChange}
              onBlur={formik.handleBlur}
              placeholder="890-000-000-00-000"
            />
            {formik.touched.unpNumber && formik.errors.unpNumber && (
              <div className="error">{formik.errors.unpNumber}</div>
            )}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label>Страна-производитель (копродукция)</label>
            <select
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            >
              <option value="Россия" label="Россия" />
              <option value="США" label="США" />
              <option value="Канада" label="Канада" />
            </select>
            {formik.touched.country && formik.errors.country && (
              <div className="error">{formik.errors.country}</div>
            )}
          </div>

          <div className="input">
            <label>
              Сведения о сметной стоимости производства фильма на территории
              Нижегородской области, если есть
            </label>
            <input
              type="number"
              name="budget"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.budget}
            />
            {formik.touched.budget && formik.errors.budget && (
              <div className="error">{formik.errors.budget}</div>
            )}
          </div>

          <div className="input">
            <label>Синопсис</label>
            <textarea
              name="synopsis"
              onChange={formik.handleChange}
              value={formik.values.synopsis}
            />
          </div>
        </div>
      </div>
      <div className="pagination-wrapper">
        <div className="pagination-container">
          <div className="pagination">
            <div className="number number_active">1</div>
            <div className="number">2</div>
            <div className="points">...</div>
            <div className="number">4</div>
            <Image src="/arrow.svg" alt="arrow" width={40} height={40} />
          </div>
          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className="submit-button"
          >
            Следующий шаг
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
