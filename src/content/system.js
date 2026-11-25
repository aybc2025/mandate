// Static explainer content for "How it works". Facts about Israel's system that
// don't change day to day. Keep neutral and plain.

export const STEPS = [
  { id: 'election', when: 'Election', text: 'Voters choose one national party list. Lists that pass 3.25% of the vote share the 120 seats in proportion.' },
  { id: 'consult', when: '≤ 7 days', text: 'The president consults every Knesset faction about who should try to form a government.' },
  { id: 'mandate', when: '28 + 14 days', text: 'The chosen MK negotiates a coalition. The president can extend once, by up to 14 days.', phases: ['mandate', 'extended'] },
  { id: 'second', when: '28 days', text: 'If that fails, the president can give a second MK the task.', phases: ['second-mandate'] },
  { id: 'nominee', when: '21 + 14 days', text: 'Then 61 MKs can jointly ask for any member to get the task. If nobody succeeds, the Knesset dissolves and new elections follow.', phases: ['knesset-nominee'] },
  { id: 'vote', when: 'Confidence vote', text: 'A government takes office once the Knesset votes confidence in it and its ministers are sworn in.', phases: ['government-formed'] },
]

export const EXPLAINERS = [
  {
    title: 'The magic number',
    body: '61 seats is a majority of the 120. But a new government only needs more yes votes than no votes in its confidence vote, so a minority government can survive if some parties abstain or support it from outside.',
  },
  {
    title: 'The president’s role',
    body: 'The president, now Isaac Herzog, is mostly ceremonial but decides who gets the mandate. He usually picks the candidate with the most recommendations, though a recommendation is not a promise to join a coalition.',
  },
  {
    title: 'Coalition agreements',
    body: 'Partners sign written deals that divide ministries and committee chairs and set policy commitments. A deal can include a rotation, where two leaders take turns as prime minister and the one waiting holds the title of alternate prime minister.',
  },
  {
    title: 'Caretaker government',
    body: 'Until a new government is sworn in, the outgoing one stays on as a caretaker with limited room for major decisions. Benjamin Netanyahu remains caretaker prime minister while talks continue.',
  },
  {
    title: 'Blocs, not just parties',
    body: 'Parties line up in blocs: Netanyahu’s right-wing and religious parties, the anti-Netanyahu “change” bloc, and the Arab parties, which have rarely been part of coalitions.',
  },
  {
    title: 'The draft question',
    body: 'Military service for ultra-Orthodox (haredi) men is the issue that cuts across blocs. The haredi parties want exemptions protected; Yisrael Beiteinu, Yashar and the Democrats campaigned on equal service.',
  },
]
