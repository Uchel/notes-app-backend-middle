const Hapi = require('@hapi/hapi')
const notes = require("./api/notes")
const NotesService = require("./services/inMemory/NotesService")
const NotesValidator = require("./validator/notes")

const init = async () => {
  const notesServices = new NotesService()
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });



  await server.register({
    plugin: notes,
    options: {
      service: notesServices,
      validator: NotesValidator,
    }
  })

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
