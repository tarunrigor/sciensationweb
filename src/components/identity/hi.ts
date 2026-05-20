import type { QuizLocale } from './types';

const hi: QuizLocale = {
  ui: {
    eyebrow: 'आइडेंटिटी असेसमेंट',
    heroLine1: 'आप दुनिया को',
    heroLine2: 'कैसे देखते हैं?',
    subtitle: 'पाँच सवाल। आठ विकल्प। कोई सही जवाब नहीं — सिर्फ़ खुलासा करने वाले।',
    startButton: 'क्विज़ शुरू करें',
    previous: 'पिछला',
    next: 'अगला',
    seeResults: 'परिणाम देखें',
    questionOf: (c, t) => `सवाल ${c} / ${t}`,
    answeredOf: (a, t) => `${t} में से ${a} के जवाब दिए`,
    yourResult: 'आपका परिणाम',
    breakdownEyebrow: 'सवाल-दर-सवाल विश्लेषण',
    breakdownHeading: 'हर जवाब क्या बताता है',
    question: (n) => `सवाल ${n}`,
    yourAnswer: 'आपका जवाब',
    feedback: 'फ़ीडबैक',
    retake: 'दोबारा करें',
    exploreFellowship: 'फ़ेलोशिप के बारे में जानें',
    backToHome: 'होम पर वापस जाएँ',
    scoreLabels: {
      exceptional: 'असाधारण',
      strong: 'मज़बूत',
      developing: 'विकासशील',
      emerging: 'प्रारंभिक',
    },
    insights: {
      exceptional: 'आप दुनिया को एक ऐसे नज़रिए से देखते हैं जो ज़्यादातर लोग कभी विकसित नहीं कर पाते। आपकी सहज प्रवृत्तियाँ उस सोच के अनुरूप हैं जो यह काम माँगता है।',
      strong: 'मज़बूत नींव जिसमें और धार लाने की गुंजाइश है। आपके पास कच्चा माल है — फ़ेलोशिप इसे निखारने के लिए ज़रूरी अनुभव देगी।',
      developing: 'आप निर्माण कर रहे हैं। कुछ प्रवृत्तियाँ हैं, कुछ को जानबूझकर विकसित करने की ज़रूरत है। फ़ेलोशिप ठीक इसी के लिए बनाई गई है।',
      emerging: 'आप इस यात्रा की शुरुआत में हैं। यह कमज़ोरी नहीं है — यह शुरुआती बिंदु है। सबसे अच्छे फ़ेलो अक्सर यहीं से शुरू करते हैं और सबसे तेज़ बढ़ते हैं।',
    },
  },
  data: {
    maxScorePerQuestion: 8,
    // TODO: Replace with Hindi questions, options, and feedback when content is ready
    questions: [],
    rubric: [],
  },
};

export default hi;
