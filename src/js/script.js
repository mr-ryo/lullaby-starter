import Sample from './lib/Sample.js';
import $ from 'jquery';

const sample = new Sample({
  name: 'world'
});// end Sample

$('.wrapper').on('click', () => {
    console.log(`hello, ${sample.name}.`);
});// end on
