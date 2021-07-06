const index = (req, res) => {
  res.render('home/index', {
    title: 'ProjNotes',
    subtitle: 'Bienvenido a ProjNotes',
    subtexto:
      'Una aplicación que permitirá registrar ideas de proyectos que vayan surgiendo.',
    textobtn: 'Registra una idea.',
  });
};

const PrimerEjercicio = (req, res) => {
  res.send(
    'Bienvenido al curso de programación web fullstack este es el primer ejercicio',
  );
};

const SegundoEjercicio = (req, res) => {
  res.status(200).json({ message: 'Este es el segundo ejercicio' });
};

const about = (req, res) => {
  res.render('home/about', {
    title: 'Acerca de ProjNotes',
    parrafo1: 'Aplicacion que permite el registro de ideas para proyectos.',
    parrafo2: 'Version 0.0.1',
  });
};

export default {
  index,
  PrimerEjercicio,
  SegundoEjercicio,
  about,
};
