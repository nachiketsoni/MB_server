const mongoose = require('mongoose');
const { type } = require('os');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium',
  },
    due_date: {
        type: Date,
        required: true,
      },
    

  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  product_id : {
    type:String,
    required: true,
  },
  price_id: {
    type:String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
taskSchema.index({ due_date: 1 });  
taskSchema.index({ assigned_to: 1 }); 

taskSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

taskSchema.virtual('isOverdue').get(function () {
    return this.due_date < new Date() && this.status !== 'completed';
  });




const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
