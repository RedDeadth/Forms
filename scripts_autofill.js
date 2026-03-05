// ============================================================
// SCRIPTS DE AUTO-RELLENO PARA TESTEAR ENCUESTAS
// Pegar en la consola del navegador (F12 → Console) 
// estando en la página de la encuesta correspondiente
// ============================================================


// ████████████████████████████████████████████████████████████
// 1. AUTOEVALUACION RIESGOS EN CASA
// URL: http://localhost/encuesta_riesgos/encuesta
// ████████████████████████████████████████████████████████████

// Pegar este script en la consola:
/*
(function(){
  // Rellena los selects de la sección 1
  const selects = document.querySelectorAll('select');
  selects.forEach(s => {
    const opts = Array.from(s.options).filter(o => o.value && o.value !== '');
    if(opts.length > 0) {
      const rand = opts[Math.floor(Math.random() * opts.length)];
      s.value = rand.value;
      s.dispatchEvent(new Event('change', {bubbles:true}));
    }
  });
  // Rellena inputs de texto
  const inputs = document.querySelectorAll('input[type="text"]:not([readonly])');
  const nombres = ['Lima','Cusco','Arequipa','Piura','La Libertad'];
  inputs.forEach((inp,i) => {
    if(!inp.value) {
      inp.value = nombres[i % nombres.length];
      inp.dispatchEvent(new Event('input', {bubbles:true}));
    }
  });
  // Click en submit
  setTimeout(() => {
    const btn = document.querySelector('button[type="submit"]');
    if(btn) btn.click();
  }, 500);
  console.log('✅ Riesgos en Casa - Formulario rellenado');
})();
*/


// ████████████████████████████████████████████████████████████
// 2. DEPENDENCIA IA UNIVERSITARIOS
// URL: http://localhost/dependencia_ia/encuesta
// ████████████████████████████████████████████████████████████

// Pegar este script en la consola:
/*
(function(){
  const comp = document.querySelector('[x-data]').__x.$data;
  // Rellenar datos personales
  document.querySelector('input[name="nombres"]').value = 'Juan';
  document.querySelector('input[name="apellidos"]').value = 'Pérez Test';
  document.querySelector('input[name="correo"]').value = 'test@email.com';
  document.querySelector('input[name="whatsapp"]').value = '+51999999999';
  document.querySelector('input[name="semestre"]').value = 'VIII';
  document.querySelector('input[name="programa_estudios"]').value = 'Ingeniería de Sistemas';
  document.querySelector('input[name="universidad"]').value = 'Universidad Nacional de Test';
  const paisInput = document.querySelector('input[name="pais"]');
  paisInput.value = 'Perú';
  paisInput.dispatchEvent(new Event('input', {bubbles:true}));
  comp.pais = 'Perú';
  document.querySelector('input[name="region"]').value = 'Lima';
  document.querySelector('input[name="provincia"]').value = 'Lima';
  // Responder 23 preguntas con valores aleatorios (1-7)
  for(let si = 0; si < comp.answers.length; si++) {
    for(let qi = 0; qi < comp.answers[si].length; qi++) {
      comp.answers[si][qi] = Math.floor(Math.random() * 7) + 1;
    }
  }
  console.log('✅ Dependencia IA - Formulario rellenado');
  console.log('Score total:', comp.totalScore(), '| Nivel:', comp.dependencyLevel());
  console.log('IDIA:', comp.idiaPercent() + '%', '|', comp.idiaLevel());
  // Auto-submit después de 1 segundo
  setTimeout(() => {
    if(comp.allAnswered()) comp.submitForm();
    else console.warn('⚠️ Faltan respuestas, revisa manualmente');
  }, 1000);
})();
*/


// ████████████████████████████████████████████████████████████
// 3. EVALUACION DE LUDOPATIA
// URL: http://localhost/evalua_ludopatia/encuesta
// ████████████████████████████████████████████████████████████

// Pegar este script en la consola:
/*
(function(){
  const comp = document.querySelector('[x-data]').__x.$data;
  // Rellenar datos del evaluador
  comp.pais = 'Perú';
  const paisInput = document.querySelector('input[name="pais"]');
  if(paisInput) { paisInput.value = 'Perú'; paisInput.dispatchEvent(new Event('input',{bubbles:true})); }
  document.querySelector('input[name="region"]').value = 'Lima';
  document.querySelector('input[name="provincia"]').value = 'Lima';
  // Dropdowns
  comp.gradoEstudios = 'Superior'; comp.gradoEstudiosLabel = 'Superior';
  comp.sexo = 'Masculino'; comp.sexoLabel = 'Masculino';
  comp.gradoInstruccion = 'Superior Universitaria'; comp.gradoInstruccionLabel = 'Superior Universitaria';
  comp.tipoTrabajo = 'Dependiente'; comp.tipoTrabajoLabel = 'Dependiente';
  comp.nivelSocio = 'C'; comp.nivelSocioLabel = 'C';
  // Datos del evaluado
  document.querySelector('input[name="edad"]').value = 28;
  // Responder 17 preguntas (0-3 aleatorio)
  for(let si = 0; si < comp.answers.length; si++) {
    for(let qi = 0; qi < comp.answers[si].length; qi++) {
      comp.answers[si][qi] = Math.floor(Math.random() * 4);
    }
  }
  console.log('✅ Ludopatía - Formulario rellenado');
  console.log('Score total:', comp.totalScore(), '/51 | Nivel:', comp.riskLevel());
  // Auto-submit después de 1 segundo
  setTimeout(() => comp.submitForm(), 1000);
})();
*/


// ████████████████████████████████████████████████████████████
// 4. KPI COMUNICACION DEL DOCENTE
// URL: http://localhost/kpi_comunicacion/encuesta  
// ████████████████████████████████████████████████████████████

// Pegar este script en la consola:
/*
(function(){
  const comp = document.querySelector('[x-data]').__x.$data;
  // Rellenar datos del encuestado
  const setVal = (name, val) => {
    const el = document.querySelector('input[name="'+name+'"]');
    if(el) { el.value = val; el.dispatchEvent(new Event('input',{bubbles:true})); }
  };
  setVal('institucion_educativa', 'Universidad Nacional de Test');
  setVal('profesion', 'Ingeniería');
  setVal('anios_ensenando', '5');
  if(comp.pais !== undefined) comp.pais = 'Perú';
  setVal('pais', 'Perú');
  setVal('region', 'Lima');
  setVal('provincia', 'Lima');
  setVal('programa_estudios', 'Ingeniería de Sistemas');
  // Dropdowns si existen
  if(comp.tipoGestion !== undefined) { comp.tipoGestion = 'Pública'; comp.tipoGestionLabel = 'Pública'; }
  if(comp.cargoInstitucion !== undefined) { comp.cargoInstitucion = 'Docente'; comp.cargoInstitucionLabel = 'Docente'; }
  // Responder todas las preguntas con valores aleatorios
  if(comp.answers) {
    for(let si = 0; si < comp.answers.length; si++) {
      for(let qi = 0; qi < comp.answers[si].length; qi++) {
        const max = comp.sections && comp.sections[si] && comp.sections[si].scale ? comp.sections[si].scale : 7;
        comp.answers[si][qi] = Math.floor(Math.random() * max) + 1;
      }
    }
  }
  // Si usa un array plano de respuestas
  if(comp.respuestas) {
    for(let i = 0; i < comp.respuestas.length; i++) {
      comp.respuestas[i] = Math.floor(Math.random() * 5) + 1;
    }
  }
  console.log('✅ KPI Comunicación - Formulario rellenado');
  if(comp.totalScore) console.log('Score total:', comp.totalScore());
  // Auto-submit
  setTimeout(() => {
    if(comp.submitForm) comp.submitForm();
    else { const btn = document.querySelector('button[type="submit"]'); if(btn) btn.click(); }
  }, 1000);
})();
*/
