import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const IconHeart = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const IconUser = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const IconNotes = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

const IconSend = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);

const IconCheck = () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const IconPlus = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export default function Gestantes() {
    const [submitted, setSubmitted] = useState(false);
    const [globalError, setGlobalError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ mode: "onTouched" });

    const handleContato = (e) => {
        let v = e.target.value.replace(/\D/g, "").slice(0, 11);
        if (v.length > 6) v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        setValue("contato", v, { shouldValidate: true });
    };

    const handleIdade = (e) => {
        const v = e.target.value.replace(/\D/g, "").slice(0, 2);
        setValue("idade", v, { shouldValidate: true });
    };

    const onValid = async (data) => {
        setGlobalError("");
        try {
            const payload = {
                nome: data.nome,
                idade: parseInt(data.idade),
                contato: data.contato,
                situacao_relatada: data.situacao_relatada || "",
                observacoes: data.observacoes || "",
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/gestantes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.erro || "Erro ao enviar.");
            }

            setSubmitted(true);
        } catch (e) {
            setGlobalError(e.message || "Não foi possível enviar. Tente novamente.");
        }
    };

    const novoCadastro = () => {
        reset();
        setSubmitted(false);
        setGlobalError("");
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-stone-50 py-16 px-6 flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-100 shadow-xl text-center">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <IconCheck />
                    </div>
                    <h2 className="text-3xl font-serif text-slate-800 font-bold mb-4">Cadastro enviado!</h2>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        Recebemos os dados com sucesso. Nossa equipe irá analisar e entrar em contato em breve.
                        <br /><br />
                        <span className="text-[#C0399A] font-medium">Você não está sozinha nessa jornada.</span>
                    </p>
                    <button
                        className="border-2 border-[#C0399A] text-[#C0399A] px-6 py-3 rounded-full font-bold hover:bg-[#FAEAF5] transition-all flex items-center justify-center gap-2 mx-auto"
                        onClick={novoCadastro}
                    >
                        <IconPlus /> Novo cadastro
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">

                {/* Cabeçalho do formulário */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-[#FAEAF5] text-[#C0399A] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <IconHeart />
                    </div>
                    <h1 className="text-4xl font-serif text-slate-900 font-bold">Cadastro de Gestante</h1>
                    <p className="mt-3 text-slate-600 max-w-md mx-auto">
                        Preencha os dados com atenção. Todas as informações são tratadas com sigilo e cuidado mútuo.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onValid)} noValidate className="space-y-6">

                    {/* Card: Dados Pessoais */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 text-lg font-serif font-semibold text-slate-800 mb-6 border-b pb-3">
                            <span className="text-[#C0399A]"><IconUser /></span>
                            Dados pessoais
                        </div>

                        {/* Nome Completo */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="nome">
                                Nome completo <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Digite seu nome completo"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.nome ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-[#C0399A]"} focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                                {...register("nome", {
                                    required: "Informe o nome completo.",
                                    minLength: { value: 3, message: "Nome muito curto." },
                                })}
                            />
                            {errors.nome && <p className="text-red-500 text-xs mt-1 font-medium">{errors.nome.message}</p>}
                        </div>

                        {/* Idade & Contato integrados na Grid adaptada */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="idade">
                                    Idade <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="idade"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Ex: 24"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.idade ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-[#C0399A]"} focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                                    {...register("idade", {
                                        required: "Informe a idade.",
                                        min: { value: 10, message: "Idade inválida." },
                                        max: { value: 60, message: "Idade inválida." },
                                        onChange: handleIdade,
                                        validate: (value) => parseInt(value, 10) >= 18 || "O Lar Renascer não atende gestantes menores de idade."
                                    })}
                                />
                                {errors.idade && <p className="text-red-500 text-xs mt-1 font-medium">{errors.idade.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="contato">
                                    Contato / WhatsApp <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="contato"
                                    type="tel"
                                    placeholder="(47) 99999-0000"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.contato ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-[#C0399A]"} focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                                    {...register("contato", {
                                        required: "Informe o contato.",
                                        minLength: { value: 14, message: "Número incompleto." },
                                        onChange: handleContato,
                                    })}
                                />
                                {errors.contato && <p className="text-red-500 text-xs mt-1 font-medium">{errors.contato.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Card: Relato */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 text-lg font-serif font-semibold text-slate-800 mb-6 border-b pb-3">
                            <span className="text-[#C0399A]"><IconNotes /></span>
                            Relato de Apoio
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="situacao_relatada">
                                Situação relatada (Obrigatório)
                            </label>
                            <textarea
                                id="situacao_relatada"
                                placeholder="Descreva a situação de risco ou dificuldade que está enfrentando..."
                                className={`w-full px-4 py-3 rounded-xl border ${errors.situacao_relatada ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-[#C0399A]"} focus:outline-none focus:ring-2 focus:border-transparent transition-all min-h-[120px]`}
                                {...register("situacao_relatada", {
                                    validate: (value) => !value || value.trim().length >= 10 || "A descrição precisa ter pelo menos 10 caracteres caso seja preenchida."
                                })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="observacoes">
                                Observações adicionais (Opcional)
                            </label>
                            <textarea
                                id="observacoes"
                                placeholder="Urgência, ponto de referência ou qualquer outro detalhe..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-[#C0399A] focus:outline-none focus:ring-2 focus:border-transparent transition-all min-h-[90px]"
                                {...register("observacoes")}
                            />
                        </div>
                    </div>

                    {/* Card: Consentimento e Botão */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-start gap-3 mb-4">
                            <input
                                type="checkbox"
                                id="consentimento"
                                className="w-4 h-4 mt-1 text-[#C0399A] focus:ring-[#C0399A] border-slate-300 rounded"
                                {...register("consentimento", {
                                    required: "Aceite o termo para prosseguir.",
                                })}
                            />
                            <label htmlFor="consentimento" className="text-sm text-slate-600 leading-relaxed select-none">
                                Concordo que os dados informados sejam utilizados pela equipe responsável para fins de atendimento interno, respeitando o sigilo absoluto das informações.
                            </label>
                        </div>
                        {errors.consentimento && <p className="text-red-500 text-xs mb-4 font-medium">{errors.consentimento.message}</p>}

                        <button
                            className="w-full bg-[#C0399A] text-white py-4 rounded-xl font-bold text-md shadow-md hover:bg-[#a52e83] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <IconSend /> Enviar solicitação
                                </>
                            )}
                        </button>

                        {globalError && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium">
                                {globalError}
                            </div>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
}