'use strict';

const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
    worksSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Укажите название проекта']
    },
     technology: {
      type: String,
      required: [true, 'Укажите технологии проекта']
    },
    img_url: {
      type: String
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('work', worksSchema);