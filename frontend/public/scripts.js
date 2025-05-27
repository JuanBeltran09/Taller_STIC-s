// URLs de tus microservicios
const AULAS_API        = 'http://localhost:3001/api/aulas';
const ESTUDIANTES_API  = 'http://localhost:3002/api/estudiantes';
const PRESTAMOS_API    = 'http://localhost:3003/api/prestamos';
const REPORTES_API     = 'http://localhost:3004/api/reportes';

// Variables globales para mantener en memoria las listas completas
let listaAulas       = [];
let listaEstudiantes = [];

document.addEventListener('DOMContentLoaded', async () => {

  await cargarAulasEnMemoria();
  await cargarEstudiantesEnMemoria();

  cargarAulas();        // muestra la lista de aulas existente
  cargarEstudiantes();  // muestra la lista de estudiantes existente

 
  poblarSelectsPrestamo();


  cargarReportesCompletos();

  document.getElementById('form-aula').addEventListener('submit', manejarFormAula);
  document.getElementById('btn-cancelar-aula').addEventListener('click', () => limpiarFormulario('aula'));

  document.getElementById('form-estudiante').addEventListener('submit', manejarFormEstudiante);
  document.getElementById('btn-cancelar-estudiante').addEventListener('click', () => limpiarFormulario('estudiante'));

  document.getElementById('form-prestamo').addEventListener('submit', manejarFormPrestamo);
});



// ——— Funciones de “memoria” (para mapear _id → datos) ———

// Descarga TODAS las aulas y las guarda en listaAulas
async function cargarAulasEnMemoria() {
  try {
    const res = await fetch(AULAS_API);
    listaAulas = await res.json();
  } catch (err) {
    console.error('Error cargando aulas en memoria:', err);
  }
}

// Descarga TODOS los estudiantes y los guarda en listaEstudiantes
async function cargarEstudiantesEnMemoria() {
  try {
    const res = await fetch(ESTUDIANTES_API);
    listaEstudiantes = await res.json();
  } catch (err) {
    console.error('Error cargando estudiantes en memoria:', err);
  }
}



// ——— CRUD de Aulas ———

async function manejarFormAula(e) {
  e.preventDefault();
  const id     = document.getElementById('aula-id').value;
  const nombre = document.getElementById('aula-nombre').value.trim();
  const cap    = parseInt(document.getElementById('aula-capacidad').value);
  const ubic   = document.getElementById('aula-ubicacion').value.trim();

  if (!nombre || !cap || !ubic) {
    alert('⚠️ Completa todos los campos de Aula.');
    return;
  }

  const payload = { nombre, capacidad: cap, ubicacion: ubic };
  const url     = id ? `${AULAS_API}/${id}` : AULAS_API;
  const method  = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Error al guardar aula');
    limpiarFormulario('aula');
    await cargarAulasEnMemoria();  // recarga la lista en memoria
    cargarAulas();                 // vuelve a pintar el CRUD de aulas
    poblarSelectsPrestamo();       // actualiza el <select> de aulas del formulario de préstamo
    cargarReportesCompletos();     // refresca reportes, por si afecta a “sala más usada”
  } catch(err) {
    console.error(err);
    alert('❌ No se pudo guardar el aula.');
  }
}

async function cargarAulas() {
  try {
    const res = await fetch(AULAS_API);
    const aulas = await res.json();
    const ul = document.getElementById('lista-aulas');
    ul.innerHTML = '';

    aulas.forEach(aula => {
      const li   = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = `${aula.nombre} (Cap: ${aula.capacidad}) – ${aula.ubicacion}`;

      // Botón “✏️” para editar
      const btnEdit = document.createElement('button');
      btnEdit.textContent = '✏️';
      btnEdit.className   = 'btn-editar';
      btnEdit.addEventListener('click', () => {
        document.getElementById('aula-id').value        = aula._id;
        document.getElementById('aula-nombre').value    = aula.nombre;
        document.getElementById('aula-capacidad').value = aula.capacidad;
        document.getElementById('aula-ubicacion').value = aula.ubicacion;
        document.getElementById('btn-guardar-aula').textContent = 'Actualizar Aula';
      });

      // Botón “🗑️” para eliminar
      const btnDel = document.createElement('button');
      btnDel.textContent = '🗑️';
      btnDel.className   = 'btn-borrar';
      btnDel.addEventListener('click', async () => {
        if (!confirm('¿Eliminar esta aula?')) return;
        await fetch(`${AULAS_API}/${aula._id}`, { method: 'DELETE' });
        await cargarAulasEnMemoria();
        cargarAulas();
        poblarSelectsPrestamo();
        cargarReportesCompletos();
      });

      li.append(span, btnEdit, btnDel);
      ul.appendChild(li);
    });
  } catch (err) {
    console.error('Error cargando aulas:', err);
  }
}



// ——— CRUD de Estudiantes ———

async function manejarFormEstudiante(e) {
  e.preventDefault();
  const id   = document.getElementById('estudiante-id').value;
  const cod  = document.getElementById('estudiante-codigo').value.trim();
  const nom  = document.getElementById('estudiante-nombre').value.trim();
  const prog = document.getElementById('estudiante-programa').value.trim();

  if (!cod || !nom || !prog) {
    alert('⚠️ Completa todos los campos de Estudiante.');
    return;
  }

  const payload = { codigo: cod, nombre: nom, programa: prog };
  const url     = id ? `${ESTUDIANTES_API}/${id}` : ESTUDIANTES_API;
  const method  = id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Error al guardar estudiante');
    limpiarFormulario('estudiante');
    await cargarEstudiantesEnMemoria();
    cargarEstudiantes();
    poblarSelectsPrestamo();
    cargarReportesCompletos();
  } catch(err) {
    console.error(err);
    alert('❌ No se pudo guardar el estudiante.');
  }
}

async function cargarEstudiantes() {
  try {
    const res = await fetch(ESTUDIANTES_API);
    const estudiantes = await res.json();
    const ul = document.getElementById('lista-estudiantes');
    ul.innerHTML = '';

    estudiantes.forEach(est => {
      const li   = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = `${est.codigo} – ${est.nombre} (${est.programa})`;

      // Botón “✏️” para editar
      const btnEdit = document.createElement('button');
      btnEdit.textContent = '✏️';
      btnEdit.className = 'btn-editar';
      btnEdit.addEventListener('click', () => {
        document.getElementById('estudiante-id').value          = est._id;
        document.getElementById('estudiante-codigo').value      = est.codigo;
        document.getElementById('estudiante-nombre').value      = est.nombre;
        document.getElementById('estudiante-programa').value    = est.programa;
        document.getElementById('btn-guardar-estudiante').textContent = 'Actualizar Estudiante';
      });

      // Botón “🗑️” para eliminar
      const btnDel = document.createElement('button');
      btnDel.textContent = '🗑️';
      btnDel.className   = 'btn-borrar';
      btnDel.addEventListener('click', async () => {
        if (!confirm('¿Eliminar este estudiante?')) return;
        await fetch(`${ESTUDIANTES_API}/${est._id}`, { method: 'DELETE' });
        await cargarEstudiantesEnMemoria();
        cargarEstudiantes();
        poblarSelectsPrestamo();
        cargarReportesCompletos();
      });

      li.append(span, btnEdit, btnDel);
      ul.appendChild(li);
    });
  } catch (err) {
    console.error('Error cargando estudiantes:', err);
  }
}



// ——— FORMULARIO “Registrar Préstamo” ———

async function poblarSelectsPrestamo() {
  const selEst = document.getElementById('prestamo-estudiante');
  const selAul = document.getElementById('prestamo-aula');
  selEst.innerHTML = '<option value="" disabled selected>Selecciona un estudiante</option>';
  selAul.innerHTML = '<option value="" disabled selected>Selecciona una aula</option>';

  listaEstudiantes.forEach(est => {
    const opt = document.createElement('option');
    opt.value = est._id;
    opt.textContent = `${est.nombre} (${est.codigo})`;
    selEst.appendChild(opt);
  });
  listaAulas.forEach(aul => {
    const opt = document.createElement('option');
    opt.value = aul._id;
    opt.textContent = `${aul.nombre} (${aul.ubicacion})`;
    selAul.appendChild(opt);
  });
}

async function manejarFormPrestamo(e) {
  e.preventDefault();

  const estId  = document.getElementById('prestamo-estudiante').value;
  const aulId  = document.getElementById('prestamo-aula').value;
  const fecha  = document.getElementById('prestamo-fecha').value;
  const motivo = document.getElementById('prestamo-motivo').value.trim();

  if (!estId || !aulId || !fecha || !motivo) {
    alert('⚠️ Completa todos los campos de Préstamo.');
    return;
  }

  const payload = { estudianteId: estId, aulaId: aulId, fecha, motivo };

  try {
    const res = await fetch(PRESTAMOS_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Error al registrar préstamo');
    alert('✅ Préstamo registrado correctamente');
    document.getElementById('prestamo-fecha').value = '';
    document.getElementById('prestamo-motivo').value = '';
    document.getElementById('prestamo-estudiante').selectedIndex = 0;
    document.getElementById('prestamo-aula').selectedIndex = 0;
    cargarReportesCompletos();
  } catch(err) {
    console.error(err);
    alert('❌ No se pudo registrar el préstamo.');
  }
}



// ——— FUNCIONES DE REPORTES ———

async function cargarReportesCompletos() {
  cargarReporteSalaMasUsada();
  cargarReporteSemanal();
  cargarReporteMensual();
  cargarReporteEstudiantesFrecuentes();
}

// 1) Sala con mayor frecuencia de préstamo
async function cargarReporteSalaMasUsada() {
  try {
    const res  = await fetch(`${REPORTES_API}/sala-mas-usada`);
    const data = await res.json(); 
    const cont = document.getElementById('reporte-sala-mas-usada');

    if (data.length === 0) {
      cont.textContent = 'No hay datos disponibles.';
      return;
    }

    const { _id: aulaId, total } = data[0];
    const aula = listaAulas.find(a => a._id === aulaId);
    const nombreAula = aula ? aula.nombre : aulaId;
    cont.textContent = `📌 Aula: "${nombreAula}" → ${total} préstamos`;
  } catch (err) {
    console.error('Error cargando sala más usada:', err);
    document.getElementById('reporte-sala-mas-usada').textContent = 'Error al cargar reporte.';
  }
}

// 2) Préstamos de la última semana
async function cargarReporteSemanal() {
  try {
    const res = await fetch(`${REPORTES_API}/semanal`);
    const prestamos = await res.json();
    renderListSimple('lista-prestamos-semanal', prestamos, p =>
      `${new Date(p.fecha).toLocaleDateString()} – Aula: ${mapAula(p.aulaId)} – ` +
      `Est: ${mapEstudiante(p.estudianteId)} – Motivo: ${p.motivo}`
    );
  } catch (err) {
    console.error('Error cargando reporte semanal:', err);
  }
}

// 3) Préstamos del último mes
async function cargarReporteMensual() {
  try {
    const res = await fetch(`${REPORTES_API}/mensual`);
    const prestamos = await res.json();
    renderListSimple('lista-prestamos-mensual', prestamos, p =>
      `${new Date(p.fecha).toLocaleDateString()} – Aula: ${mapAula(p.aulaId)} – ` +
      `Est: ${mapEstudiante(p.estudianteId)} – Motivo: ${p.motivo}`
    );
  } catch (err) {
    console.error('Error cargando reporte mensual:', err);
  }
}

// 4) Estudiantes con mayor uso de salas
async function cargarReporteEstudiantesFrecuentes() {
  try {
    const res = await fetch(`${REPORTES_API}/estudiantes-frecuentes`);
    const frecuentes = await res.json(); 
    renderListSimple('lista-estudiantes-frecuentes', frecuentes, f => {
      const est = listaEstudiantes.find(e => e._id === f._id);
      const nombre = est ? `${est.nombre} (${est.codigo})` : f._id;
      return `${nombre} → ${f.total} préstamos`;
    });
  } catch (err) {
    console.error('Error cargando reporte estudiantes frecuentes:', err);
  }
}

// ——— UTILIDADES ———

// Renderizar lista simple
function renderListSimple(id, items, formatter) {
  const ul = document.getElementById(id);
  ul.innerHTML = '';
  if (!Array.isArray(items) || items.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron registros.';
    ul.appendChild(li);
    return;
  }
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = formatter(item);
    ul.appendChild(li);
  });
}

// Mapea ID de aula → nombre de aula
function mapAula(aulaId) {
  const a = listaAulas.find(x => x._id === aulaId);
  return a ? a.nombre : aulaId;
}

// Mapea ID de estudiante → "Nombre (Código)"
function mapEstudiante(estId) {
  const e = listaEstudiantes.find(x => x._id === estId);
  return e ? `${e.nombre} (${e.codigo})` : estId;
}

// Limpia formularios (Aula o Estudiante)
function limpiarFormulario(tipo) {
  if (tipo === 'aula') {
    document.getElementById('aula-id').value         = '';
    document.getElementById('aula-nombre').value     = '';
    document.getElementById('aula-capacidad').value  = '';
    document.getElementById('aula-ubicacion').value  = '';
    document.getElementById('btn-guardar-aula').textContent = 'Crear Aula';
  }
  if (tipo === 'estudiante') {
    document.getElementById('estudiante-id').value       = '';
    document.getElementById('estudiante-codigo').value   = '';
    document.getElementById('estudiante-nombre').value   = '';
    document.getElementById('estudiante-programa').value = '';
    document.getElementById('btn-guardar-estudiante').textContent = 'Crear Estudiante';
  }
}
