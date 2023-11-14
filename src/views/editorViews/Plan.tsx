import Field, { FieldType } from "../../components/UI/Field";

export default function Plan() {
    return (
        <div className="flex-1 gap-4 p-4">
            <div className="mb-4">
                <p className="font-semibold mb-2">Объем учебной дисциплины<span className="text-secondary-text ml-2">Всего: -</span></p>
                <div className="flex gap-x-2 gap-y-2 flex-wrap">
                    <div>
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-1">
                            Теория
                        </label>
                        <Field value="" readable={FieldType.READONLY} />
                    </div>

                    <div>
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-1">
                            Лабораторные
                        </label>
                        <Field value="" readable={FieldType.READONLY} />
                    </div>

                    <div>
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-1">
                            Практические
                        </label>
                        <Field value="" readable={FieldType.READONLY} />
                    </div>

                    <div>
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-1">
                            Самостоятельные
                        </label>
                        <Field value="" readable={FieldType.READONLY} />
                    </div>

                    <div>
                        <label className="block text-[#C9C9C9] text-sm font-semibold mb-1">
                            Промеж-ая аттестация
                        </label>
                        <Field value="" readable={FieldType.READONLY} />
                    </div>
                </div>
            </div>

            <div>
                <p className="font-semibold mb-2">Тематический план</p>


                <button  className="text-sm px-6 py-2 rounded w-fit font-medium bg-[#3A3A3A] text-white">
                    Добавить раздел
                </button>
            </div>
        </div>
    );
}