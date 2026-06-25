import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useForm } from "react-hook-form";
 
import "./App.css";
import {
  IconHeart,
  IconUser,
  IconNotes,
  IconSend,
  IconCheck,
  IconPlus,
} from "./icons";
 
export default function CadastroGestante({ onSubmit }) {
  const [submitted, setSubmitted] = useState(false);
  const [globalError, setGlobalError] = useState("");
 
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });
 
  /* Máscara de telefone */
  const handleContato = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    setValue("contato", v, { shouldValidate: true });
  };
 
  /* Somente dígitos na idade */
  const handleIdade = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
    setValue("idade", v, { shouldValidate: true });
  };
 
/* Submit — envia para o backend Node.js */
  const onValid = async (data) => {
    setGlobalError("");
    try {
      const payload = {
        nome:              data.nome,
        idade:             parseInt(data.idade),
        contato:           data.contato,
        situacao_relatada: data.situacao_relatada,
        observacoes:       data.observacoes || "",
      };
 
      const response = await fetch("http://localhost:3000/gestantes", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
 
      if (!response.ok) {
        console.log("Erro ao enviar:", response.status, response.statusText);
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
 
  /* ── Tela de sucesso ──────────────────────────────────── */
  if (submitted) {
    return (
      <div className="cg-page">
        <div className="cg-wrap">
          <div className="cg-card cg-success">
            <div className="cg-success-icon">
              <IconCheck />
            </div>
            <h2>Cadastro enviado!</h2>
            <p>
              Recebemos os dados com sucesso. Nossa equipe irá analisar e
              entrar em contato em breve.
              <br />
              <br />
              Você não está sozinha nessa jornada.
            </p>
            <button className="cg-btn-outline" onClick={novoCadastro}>
              <IconPlus /> Novo cadastro
            </button>
          </div>
        </div>
      </div>
    );
  }
 
  /* ── Formulário ───────────────────────────────────────── */
  return (
    <div className="cg-page">
      <div className="cg-wrap">
 
        {/* Cabeçalho */}
        <div className="cg-header">
          <div className="cg-icon">
            <IconHeart />
          </div>
          <h1 className="cg-title">Cadastro de Gestante</h1>
          <p className="cg-subtitle">
            Preencha os dados com atenção. Todas as informações são tratadas
            com sigilo e cuidado.
          </p>
        </div>
 
        <form onSubmit={handleSubmit(onValid)} noValidate>
 
          {/* ── Card: dados pessoais ─────────────────────── */}
          <div className="cg-card">
            <div className="cg-section-label">
              <IconUser /> Dados pessoais
            </div>
 
            {/* Nome */}
            <div className="cg-field">
              <input
                id="nome"
                type="text"
                placeholder="Nome completo *"
                className={`cg-input${errors.nome ? " error" : ""}`}
                {...register("nome", {
                  required: "Informe o nome completo.",
                  minLength: { value: 3, message: "Nome muito curto." },
                })}
              />
              {errors.nome && (
                <p className="cg-field-error">{errors.nome.message}</p>
              )}
            </div>
 
            <div className="cg-row2">
              {/* Idade */}
              <div className="cg-field">
                <label className="cg-label" htmlFor="idade">
                  Idade <span className="cg-req">*</span>
                </label>
                <input
                  id="idade"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex: 24"
                  className={`cg-input${errors.idade ? " error" : ""}`}
                  {...register("idade", {
                    required: "Informe a idade.",
                    min: { value: 10, message: "Idade inválida." },
                    max: { value: 60, message: "Idade inválida." },
                    onChange: handleIdade,
                  })}
                />
                {errors.idade && (
                  <p className="cg-field-error">{errors.idade.message}</p>
                )}
              </div>
 
              {/* Contato */}
              <div className="cg-field">
                <label className="cg-label" htmlFor="contato">
                  Contato <span className="cg-req">*</span>
                </label>
                <input
                  id="contato"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className={`cg-input${errors.contato ? " error" : ""}`}
                  {...register("contato", {
                    required: "Informe o contato.",
                    minLength: { value: 14, message: "Número incompleto." },
                    onChange: handleContato,
                  })}
                />
                {errors.contato && (
                  <p className="cg-field-error">{errors.contato.message}</p>
                )}
              </div>
            </div>
          </div>
 
          {/* ── Card: relato ─────────────────────────────── */}
          <div className="cg-card">
            <div className="cg-section-label">
              <IconNotes /> Relato
            </div>
 
            {/* Situação relatada */}
            <div className="cg-field">
              <label className="cg-label" htmlFor="situacao_relatada">
                Situação relatada <span className="cg-req">*</span>
              </label>
              <textarea
                id="situacao_relatada"
                placeholder="Descreva a situação de risco ou dificuldade que a gestante está enfrentando..."
                className={`cg-textarea${errors.situacao_relatada ? " error" : ""}`}
                {...register("situacao_relatada", {
                  minLength: { value: 10, message: "Descrição muito curta." },
                })}
              />
              {errors.situacao && (
                <p className="cg-field-error">{errors.situacao_relatada.message}</p>
              )}
            </div>
 
            {/* Observações */}
            <div className="cg-field">
              <label className="cg-label" htmlFor="observacoes">
                Observações
              </label>
              <textarea
                id="observacoes"
                placeholder="Informações adicionais, urgência ou qualquer detalhe relevante..."
                className="cg-textarea obs"
                {...register("observacoes")}
              />
            </div>
          </div>
 
          {/* ── Card: consentimento + envio ──────────────── */}
          <div className="cg-card">
            <div className="cg-consent">
              <input
                type="checkbox"
                id="consentimento"
                {...register("consentimento", {
                  required: "Aceite o termo para continuar.",
                })}
              />
              <label htmlFor="consentimento" className="cg-consent-text">
                Concordo que os dados informados sejam utilizados pela equipe
                responsável para fins de atendimento, respeitando o sigilo das
                informações.
              </label>
            </div>
            {errors.consentimento && (
              <p className="cg-field-error" style={{ marginBottom: "10px" }}>
                {errors.consentimento.message}
              </p>
            )}
 
            <button className="cg-btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="cg-spinner" />
              ) : (
                <>
                  <IconSend /> Enviar cadastro
                </>
              )}
            </button>
 
            {globalError && (
              <div className="cg-alert cg-alert-error">{globalError}</div>
            )}
          </div>
 
        </form>
      </div>
    </div>
  );
}