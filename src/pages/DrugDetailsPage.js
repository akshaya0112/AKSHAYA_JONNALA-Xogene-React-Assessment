import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DrugDetailsPage = () => {
  const { drugName } = useParams();
  const [drugDetails, setDrugDetails] = useState(null);
  const [ndcs, setNdcs] = useState([]);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugName}`);
        const rxcui = response.data.idGroup.rxnormId[0];
        const detailsResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}.json`);
        setDrugDetails(detailsResponse.data.rxnormdata);

        const ndcResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`);
        setNdcs(ndcResponse.data.ndcGroup.ndcList);
      } catch (err) {
        console.error('Error fetching drug details:', err);
      }
    };

    fetchDrugDetails();
  }, [drugName]);

  if (!drugDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{drugDetails.name}</h1>
      <p>RxCUI: {drugDetails.id}</p>
      <p>Synonyms: {drugDetails.synonym.join(', ')}</p>
      <h2>NDCs</h2>
      <ul>
        {ndcs.map((ndc) => (
          <li key={ndc}>{ndc}</li>
        ))}
      </ul>
    </div>
  );
};

export default DrugDetailsPage;
