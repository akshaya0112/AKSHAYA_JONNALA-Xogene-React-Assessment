import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

const drugData = {
  drugGroup: {
    conceptGroup: [
      {
        conceptProperties: [
          { rxcui: '123', name: 'Aspirin' },
          { rxcui: '456', name: 'Ibuprofen' },
        ],
      },
    ],
  },
};

const spellingSuggestions = {
  suggestionGroup: {
    suggestionList: {
      suggestion: ['aspirin', 'ibuprofen'],
    },
  },
};

mock.onGet(/\/drugs.json/).reply(200, drugData);
mock.onGet(/\/spellingsuggestions.json/).reply(200, spellingSuggestions);

export default mock;
