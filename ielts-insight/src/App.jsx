import React, { useState, useEffect, useRef } from 'react';
import { FileText, BookOpen, PenTool, Brain, ChevronDown, ChevronUp, Upload, X, Loader, Search } from 'lucide-react';

// ==================== 类型定义 ====================
const DifficultyLevel = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced'
};

const LogicRole = {
  MAIN_CLAIM: 'Main-Claim',
  DATA_SUPPORT: 'Data-Support',
  COUNTER_ARGUMENT: 'Counter-Argument',
  CONCESSION: 'Concession',
  WARRANT: 'Warrant',
  QUALIFIER: 'Qualifier'
};

// ==================== 莫兰迪色系颜色映射 ====================
const LOGIC_ROLE_COLORS = {
  [LogicRole.MAIN_CLAIM]: {
    bg: '#9B8BA3',
    border: '#8B7B93',
    text: '#F9F8F5',
    light: 'rgba(155, 139, 163, 0.08)'
  },
  [LogicRole.DATA_SUPPORT]: {
    bg: '#7FA3A3',
    border: '#6F9393',
    text: '#F9F8F5',
    light: 'rgba(127, 163, 163, 0.08)'
  },
  [LogicRole.COUNTER_ARGUMENT]: {
    bg: '#A39478',
    border: '#936B68',
    text: '#F9F8F5',
    light: 'rgba(163, 148, 120, 0.08)'
  },
  [LogicRole.CONCESSION]: {
    bg: '#8B9E7D',
    border: '#7B8E6D',
    text: '#F9F8F5',
    light: 'rgba(139, 158, 125, 0.08)'
  },
  [LogicRole.WARRANT]: {
    bg: '#9B93A3',
    border: '#8B8393',
    text: '#F9F8F5',
    light: 'rgba(155, 147, 163, 0.08)'
  },
  [LogicRole.QUALIFIER]: {
    bg: '#A0957D',
    border: '#906D5D',
    text: '#F9F8F5',
    light: 'rgba(160, 149, 125, 0.08)'
  }
};

// ==================== 默认Mock数据 ====================
const defaultMockData = {
  metadata: {
    title: "The Impact of Artificial Intelligence on Education",
    difficultyLevel: DifficultyLevel.ADVANCED,
    suggestedDuration: 40,
    topic: "AI Education",
    source: "Academic Essay Sample"
  },
  structure: {
    nodes: [
      {
        id: "node-1",
        label: "Central Thesis",
        content: "AI will revolutionize education by personalizing learning experiences",
        originalText: "Artificial intelligence has the potential to fundamentally transform the educational landscape by offering unprecedented opportunities for personalized learning.",
        logicRole: LogicRole.MAIN_CLAIM,
        children: ["node-2", "node-3", "node-6"]
      },
      {
        id: "node-2",
        label: "Supporting Evidence",
        content: "AI enables adaptive learning systems",
        originalText: "Adaptive learning platforms powered by AI can analyze individual student performance in real-time and adjust content difficulty accordingly.",
        logicRole: LogicRole.DATA_SUPPORT,
        children: ["node-4"]
      },
      {
        id: "node-3",
        label: "Supporting Evidence",
        content: "AI provides 24/7 tutoring support",
        originalText: "AI-driven chatbots and virtual assistants can provide students with round-the-clock support, answering questions and providing guidance outside traditional classroom hours.",
        logicRole: LogicRole.DATA_SUPPORT,
        children: ["node-5"]
      },
      {
        id: "node-4",
        label: "Example",
        content: "Khan Academy uses AI for personalized practice",
        originalText: "For instance, Khan Academy's AI system identifies knowledge gaps and recommends specific exercises to help students master challenging concepts.",
        logicRole: LogicRole.WARRANT,
        children: []
      },
      {
        id: "node-5",
        label: "Example",
        content: "Duolingo adapts to learning pace",
        originalText: "Similarly, Duolingo employs machine learning algorithms to customize lesson difficulty based on user progress and retention rates.",
        logicRole: LogicRole.WARRANT,
        children: []
      },
      {
        id: "node-6",
        label: "Counter-argument",
        content: "Critics worry about reduced human interaction",
        originalText: "However, critics argue that over-reliance on AI could diminish the essential human connection between teachers and students.",
        logicRole: LogicRole.COUNTER_ARGUMENT,
        children: ["node-7"]
      },
      {
        id: "node-7",
        label: "Rebuttal",
        content: "AI should augment, not replace teachers",
        originalText: "Nevertheless, the most effective implementation treats AI as a tool to augment teacher capabilities rather than replace human educators entirely.",
        logicRole: LogicRole.CONCESSION,
        children: []
      }
    ],
    rootNodeId: "node-1"
  },
  connections: [
    { fromNodeId: "node-1", toNodeId: "node-2", relationLabel: "Because" },
    { fromNodeId: "node-1", toNodeId: "node-3", relationLabel: "Additionally" },
    { fromNodeId: "node-2", toNodeId: "node-4", relationLabel: "For instance" },
    { fromNodeId: "node-3", toNodeId: "node-5", relationLabel: "Similarly" },
    { fromNodeId: "node-1", toNodeId: "node-6", relationLabel: "However" },
    { fromNodeId: "node-6", toNodeId: "node-7", relationLabel: "Nevertheless" }
  ],
  vocabulary: [
    {
      word: "unprecedented",
      simpleExplanation: "never done or known before; completely new",
      spokenExample: "We're facing unprecedented challenges with remote learning.",
      writingExample: "The pandemic created unprecedented opportunities for educational technology adoption.",
      partOfSpeech: "adjective",
      difficulty: DifficultyLevel.ADVANCED
    },
    {
      word: "adaptive",
      simpleExplanation: "able to change to fit new conditions",
      spokenExample: "I love how adaptive this app is to my learning speed.",
      writingExample: "Adaptive learning systems represent a significant advancement in educational methodology.",
      partOfSpeech: "adjective",
      difficulty: DifficultyLevel.INTERMEDIATE
    },
    {
      word: "augment",
      simpleExplanation: "to make something greater by adding to it",
      spokenExample: "Technology should augment what teachers do, not replace them.",
      writingExample: "AI tools can augment traditional teaching methods by providing data-driven insights.",
      partOfSpeech: "verb",
      difficulty: DifficultyLevel.ADVANCED
    },
    {
      word: "retention",
      simpleExplanation: "the ability to keep or remember something",
      spokenExample: "My retention of vocabulary improved with spaced repetition.",
      writingExample: "Studies show that active learning techniques enhance information retention rates.",
      partOfSpeech: "noun",
      difficulty: DifficultyLevel.INTERMEDIATE
    },
    {
      word: "transform",
      simpleExplanation: "to change something completely",
      spokenExample: "This new method will transform how we learn languages.",
      writingExample: "Digital technologies continue to transform educational practices worldwide.",
      partOfSpeech: "verb",
      difficulty: DifficultyLevel.INTERMEDIATE
    }
  ],
  writingTemplate: {
    title: "Technology Impact Essay Structure",
    structure: [
      "Introduction: Hook + Thesis Statement",
      "Body Paragraph 1: First Supporting Argument + Evidence",
      "Body Paragraph 2: Second Supporting Argument + Evidence",
      "Body Paragraph 3: Counter-argument + Rebuttal",
      "Conclusion: Restate Thesis + Final Thoughts"
    ],
    template: "[Technology/Innovation] has the potential to [main impact] by [key mechanism]. While [supporting point 1], it also [supporting point 2]. However, critics argue that [counter-argument]. Nevertheless, [rebuttal statement].",
    keyPhrases: [
      "has the potential to",
      "fundamentally transform",
      "unprecedented opportunities",
      "However, critics argue that",
      "Nevertheless, the most effective implementation"
    ],
    logicFlow: [
      "State main claim clearly",
      "Provide concrete evidence",
      "Use transitional phrases (However, Nevertheless)",
      "Acknowledge opposing views",
      "Conclude with balanced position"
    ]
  },
  translations: [
    "人工智能有潜力通过提供前所未有的个性化学习机会,从根本上改变教育格局。",
    "由人工智能驱动的自适应学习平台可以实时分析学生的个人表现,并相应调整内容难度。例如,Khan Academy的人工智能系统可以识别知识空白,并推荐特定练习来帮助学生掌握具有挑战性的概念。",
    "人工智能驱动的聊天机器人和虚拟助手可以为学生提供全天候支持,在传统课堂时间之外回答问题并提供指导。同样,Duolingo采用机器学习算法,根据用户的进度和记忆保持率来定制课程难度。",
    "然而,批评者认为,过度依赖人工智能可能会削弱教师与学生之间必不可少的人际联系。尽管如此,最有效的实施方式是将人工智能视为增强教师能力的工具,而不是完全取代人类教育者。"
  ],
  content: [
    "Artificial intelligence has the potential to fundamentally transform the educational landscape by offering unprecedented opportunities for personalized learning.",
    "Adaptive learning platforms powered by AI can analyze individual student performance in real-time and adjust content difficulty accordingly. For instance, Khan Academy's AI system identifies knowledge gaps and recommends specific exercises to help students master challenging concepts.",
    "AI-driven chatbots and virtual assistants can provide students with round-the-clock support, answering questions and providing guidance outside traditional classroom hours. Similarly, Duolingo employs machine learning algorithms to customize lesson difficulty based on user progress and retention rates.",
    "However, critics argue that over-reliance on AI could diminish the essential human connection between teachers and students. Nevertheless, the most effective implementation treats AI as a tool to augment teacher capabilities rather than replace human educators entirely."
  ]
};

// ==================== AI分析和翻译函数 ====================
const analyzeArticleWithAI = async (articleText, title) => {
  try {
    // 第一步：分析文章结构生成思维导图
    const structureResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: `Analyze this article and create a logical argument structure with nodes and connections. Return ONLY valid JSON without any markdown formatting or explanations.

Article Title: ${title}
Article Content:
${articleText}

Return a JSON object with this exact structure:
{
  "nodes": [
    {
      "id": "node-1",
      "label": "Brief label",
      "content": "Short summary",
      "originalText": "Original sentence from article",
      "logicRole": "Main-Claim|Data-Support|Counter-Argument|Concession|Warrant|Qualifier",
      "children": ["node-2"]
    }
  ],
  "connections": [
    {
      "fromNodeId": "node-1",
      "toNodeId": "node-2",
      "relationLabel": "Because|However|Additionally|Nevertheless|For instance"
    }
  ],
  "rootNodeId": "node-1"
}`
          }
        ]
      })
    });

    const structureData = await structureResponse.json();
    let structure = { nodes: [], connections: [], rootNodeId: "node-1" };
    
    try {
      const structureText = structureData.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("");
      
      const cleanJson = structureText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      structure = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Structure parsing failed:", e);
      // 使用fallback结构
      const paragraphs = articleText.split('\n').filter(p => p.trim());
      structure = {
        nodes: paragraphs.slice(0, 5).map((p, i) => ({
          id: `node-${i + 1}`,
          label: `Point ${i + 1}`,
          content: p.slice(0, 60) + '...',
          originalText: p,
          logicRole: i === 0 ? LogicRole.MAIN_CLAIM : LogicRole.DATA_SUPPORT,
          children: i < 4 ? [`node-${i + 2}`] : []
        })),
        connections: paragraphs.slice(0, 4).map((_, i) => ({
          fromNodeId: `node-${i + 1}`,
          toNodeId: `node-${i + 2}`,
          relationLabel: "Additionally"
        })),
        rootNodeId: "node-1"
      };
    }

    // 第二步：翻译文章
    const translateResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [
          {
            role: "user",
            content: `Translate this English article to Chinese. Provide high-quality, natural Chinese translations.

Article:
${articleText}

Return ONLY a JSON array of translated paragraphs (one string per paragraph), without any markdown formatting:
["translation 1", "translation 2", ...]`
          }
        ]
      })
    });

    const translateData = await translateResponse.json();
    let translations = [];
    
    try {
      const translateText = translateData.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("");
      
      const cleanJson = translateText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      translations = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Translation parsing failed:", e);
      const paragraphs = articleText.split('\n').filter(p => p.trim());
      translations = paragraphs.map((p, i) => `[段落 ${i + 1} 翻译]`);
    }

    // 第三步：提取关键词汇
    const vocabResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 3000,
        messages: [
          {
            role: "user",
            content: `Extract 5-10 important vocabulary words from this article for IELTS learners. Return ONLY valid JSON.

Article:
${articleText}

Return JSON array:
[
  {
    "word": "word",
    "partOfSpeech": "noun/verb/adjective",
    "simpleExplanation": "simple definition",
    "spokenExample": "example sentence for speaking",
    "writingExample": "example sentence for academic writing",
    "difficulty": "beginner|intermediate|advanced"
  }
]`
          }
        ]
      })
    });

    const vocabData = await vocabResponse.json();
    let vocabulary = defaultMockData.vocabulary;
    
    try {
      const vocabText = vocabData.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("");
      
      const cleanJson = vocabText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      vocabulary = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Vocabulary parsing failed:", e);
    }

    const paragraphs = articleText.split('\n').filter(p => p.trim());
    
    return {
      metadata: {
        title: title || "Imported Article",
        difficultyLevel: DifficultyLevel.INTERMEDIATE,
        suggestedDuration: Math.ceil(paragraphs.length * 3),
        topic: "Custom Analysis",
        source: "User Submitted"
      },
      structure: {
        nodes: structure.nodes || [],
        rootNodeId: structure.rootNodeId || "node-1"
      },
      connections: structure.connections || [],
      vocabulary: vocabulary,
      writingTemplate: defaultMockData.writingTemplate,
      translations: translations,
      content: paragraphs
    };
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw error;
  }
};

// ==================== 外部词典查询函数 ====================
const fetchExternalDefinition = async (word) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const externalDictionary = {
    'revolutionary': {
      word: 'revolutionary',
      partOfSpeech: 'adjective/noun',
      simpleExplanation: 'Involving or causing a complete or dramatic change; a person who advocates revolutionary change',
      spokenExample: 'The smartphone technology was revolutionary when it first appeared.',
      writingExample: 'Revolutionary ideas often face initial resistance from traditional institutions.',
      difficulty: DifficultyLevel.ADVANCED
    },
    'methodology': {
      word: 'methodology',
      partOfSpeech: 'noun',
      simpleExplanation: 'A system of methods and principles used in a particular discipline or approach',
      spokenExample: 'The researcher explained her research methodology in detail.',
      writingExample: 'This paper proposes a new methodology for analyzing data in social networks.',
      difficulty: DifficultyLevel.ADVANCED
    },
    'implement': {
      word: 'implement',
      partOfSpeech: 'verb',
      simpleExplanation: 'To put a decision, plan, or system into effect',
      spokenExample: 'The company will implement the new policy next month.',
      writingExample: 'Schools need to implement better strategies to reduce dropout rates.',
      difficulty: DifficultyLevel.INTERMEDIATE
    },
    'optimize': {
      word: 'optimize',
      partOfSpeech: 'verb',
      simpleExplanation: 'To make something as effective or functional as possible',
      spokenExample: 'We need to optimize our study schedule for better results.',
      writingExample: 'Machine learning algorithms help optimize complex business processes.',
      difficulty: DifficultyLevel.INTERMEDIATE
    },
    'challenge': {
      word: 'challenge',
      partOfSpeech: 'noun/verb',
      simpleExplanation: '(noun) A difficult task or problem; (verb) to question the truth or validity of something',
      spokenExample: 'Learning a new language is a challenging task.',
      writingExample: 'The research challenges the previously accepted theory.',
      difficulty: DifficultyLevel.BEGINNER
    }
  };

  if (externalDictionary[word.toLowerCase()]) {
    return externalDictionary[word.toLowerCase()];
  }

  return {
    word: word,
    partOfSpeech: 'unknown',
    simpleExplanation: `"${word}" is a word that appears in academic or specialized contexts. Consider consulting a comprehensive English dictionary for precise definition and usage.`,
    spokenExample: `The word "${word}" was mentioned in the reading material.`,
    writingExample: `Students often encounter the word "${word}" in academic texts.`,
    difficulty: DifficultyLevel.INTERMEDIATE
  };
};

// ==================== 加载动画 ====================
const LoadingSpinner = ({ message = "Analyzing article with AI..." }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-sm p-8 border border-gray-200 text-center w-96">
        <div className="flex justify-center mb-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border border-gray-300"></div>
            <div className="absolute inset-0 rounded-full border-t border-gray-500 animate-spin"></div>
          </div>
        </div>
        <p className="text-sm font-serif text-gray-800">{message}</p>
        <p className="text-xs text-gray-500 mt-2">Generating mindmap and translations...</p>
      </div>
    </div>
  );
};

// ==================== 文章导入对话框 ====================
const ArticleImportDialog = ({ isOpen, onClose, onAnalyze, isLoading }) => {
  const [articleText, setArticleText] = useState('');
  const [articleTitle, setArticleTitle] = useState('');

  const handleAnalyze = () => {
    if (!articleText.trim()) return;
    onAnalyze(articleText, articleTitle);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-sm p-8 border border-gray-200 w-full max-w-2xl max-h-96 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-serif font-bold text-gray-900">Import Article</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Article Title
            </label>
            <input
              type="text"
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              placeholder="Enter article title"
              className="w-full px-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Article Text
            </label>
            <textarea
              value={articleText}
              onChange={(e) => setArticleText(e.target.value)}
              placeholder="Paste your article text here..."
              className="w-full h-48 px-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-200 text-gray-800 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAnalyze}
            disabled={!articleText.trim() || isLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-sm text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading && <Loader size={16} className="animate-spin" />}
            {isLoading ? 'Analyzing with AI...' : 'Analyze'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== SVG思维导图组件 ====================
const calculateNodePositions = (nodes, rootId) => {
  const positions = new Map();
  const visited = new Set();
  
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const verticalGap = 180;
  const horizontalGap = 280;
  
  let levelNodes = new Map();
  let depths = new Map();
  
  const calculateDepth = (nodeId, depth = 0) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    depths.set(nodeId, depth);
    if (!levelNodes.has(depth)) {
      levelNodes.set(depth, []);
    }
    levelNodes.get(depth).push(nodeId);
    
    const node = nodeMap.get(nodeId);
    if (node?.children) {
      node.children.forEach(childId => calculateDepth(childId, depth + 1));
    }
  };
  
  calculateDepth(rootId);
  
  levelNodes.forEach((nodeIds, level) => {
    const levelWidth = nodeIds.length * horizontalGap;
    const startX = -levelWidth / 2 + horizontalGap / 2;
    
    nodeIds.forEach((nodeId, index) => {
      const x = startX + index * horizontalGap;
      const y = level * verticalGap;
      positions.set(nodeId, { x, y });
    });
  });
  
  return positions;
};

const MindmapNode = ({ id, node, x, y, offsetX, offsetY, isHighlighted, onClick }) => {
  const colors = LOGIC_ROLE_COLORS[node.logicRole];
  
  const nodeX = x + offsetX;
  const nodeY = y + offsetY;

  return (
    <g
      key={id}
      transform={`translate(${nodeX}, ${nodeY})`}
      onClick={() => onClick(node)}
      className="cursor-pointer"
      style={{
        filter: isHighlighted
          ? 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))'
          : 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.05))'
      }}
    >
      <rect
        x="-100"
        y="-45"
        width="200"
        height="90"
        rx="4"
        style={{
          fill: colors.light,
          stroke: colors.border,
          strokeWidth: 1.2,
          opacity: 1,
          transition: 'all 0.3s ease'
        }}
      />
      <line
        x1="-100"
        y1="-45"
        x2="100"
        y2="-45"
        stroke={colors.border}
        strokeWidth="2.5"
        opacity="0.6"
      />
      
      <text
        x="0"
        y="-20"
        textAnchor="middle"
        style={{
          fontSize: '11px',
          fontWeight: '600',
          fill: colors.bg,
          pointerEvents: 'none',
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}
      >
        {node.logicRole}
      </text>
      <text
        x="0"
        y="0"
        textAnchor="middle"
        style={{
          fontSize: '13px',
          fontWeight: '500',
          fill: colors.bg,
          pointerEvents: 'none'
        }}
      >
        {node.label}
      </text>
      <foreignObject x="-95" y="10" width="190" height="30">
        <div style={{
          fontSize: '11px',
          color: colors.bg,
          textAlign: 'center',
          lineHeight: '1.4',
          fontWeight: '400',
          padding: '0 8px'
        }}>
          {node.content}
        </div>
      </foreignObject>
    </g>
  );
};

const MindmapSVG = ({ nodes, connections, rootNodeId, onNodeClick, highlightedNodeId }) => {
  const positions = calculateNodePositions(nodes, rootNodeId);
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  
  const allNodes = Array.from(positions.entries());
  const minX = Math.min(...allNodes.map(([_, pos]) => pos.x)) - 150;
  const maxX = Math.max(...allNodes.map(([_, pos]) => pos.x)) + 150;
  const maxY = Math.max(...allNodes.map(([_, pos]) => pos.y)) + 150;
  
  const svgWidth = maxX - minX + 100;
  const svgHeight = maxY + 100;
  const offsetX = -minX + 50;
  const offsetY = 50;
  
  return (
    <svg 
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="w-full h-full bg-white rounded-sm"
      style={{ minHeight: '600px' }}
    >
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#D0D5DD" />
        </marker>
        <marker id="arrowhead-highlight" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#8B7355" />
        </marker>
      </defs>
      
      {connections.map((conn, idx) => {
        const fromPos = positions.get(conn.fromNodeId);
        const toPos = positions.get(conn.toNodeId);
        
        if (!fromPos || !toPos) return null;
        
        const isHighlighted = highlightedNodeId === conn.toNodeId || highlightedNodeId === conn.fromNodeId;
        const fromNode = nodeMap.get(conn.fromNodeId);
        
        const fromX = fromPos.x + offsetX;
        const fromY = fromPos.y + offsetY + 50;
        const toX = toPos.x + offsetX;
        const toY = toPos.y + offsetY;
        
        const midY = (fromY + toY) / 2;
        const pathD = `M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`;
        
        const fromNodeColor = fromNode ? LOGIC_ROLE_COLORS[fromNode.logicRole].bg : '#D0D5DD';
        const connectionColor = isHighlighted ? '#8B7355' : fromNodeColor;
        
        return (
          <g key={`conn-${idx}`}>
            <path
              d={pathD}
              stroke={connectionColor}
              strokeWidth={isHighlighted ? 2 : 1.5}
              fill="none"
              markerEnd={isHighlighted ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
              className="transition-all duration-300"
              opacity="0.6"
            />
            <text 
              x={(fromX + toX) / 2} 
              y={(fromY + toY) / 2 - 8} 
              textAnchor="middle" 
              style={{
                fontSize: '10px',
                fill: '#8B8B8B',
                fontWeight: '500',
                letterSpacing: '0.3px'
              }}
            >
              {conn.relationLabel}
            </text>
          </g>
        );
      })}
      
      {Array.from(positions.entries()).map(([nodeId, pos]) => {
        const node = nodeMap.get(nodeId);
        const isHighlighted = highlightedNodeId === nodeId;
        
        return (
          <MindmapNode
            key={nodeId}
            id={nodeId}
            node={node}
            x={pos.x}
            y={pos.y}
            offsetX={offsetX}
            offsetY={offsetY}
            isHighlighted={isHighlighted}
            onClick={onNodeClick}
          />
        );
      })}
    </svg>
  );
};

// ==================== MindmapTab ====================
const MindmapTab = ({ data, onNodeClick, highlightedNode }) => {
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-serif font-bold text-gray-800 mb-2">Argument Map</h3>
          <p className="text-xs text-gray-600">Click any node to view the original text</p>
        </div>
        
        <div className="bg-white rounded-sm border border-gray-200 p-6 mb-8" style={{ minHeight: '600px' }}>
          <MindmapSVG
            nodes={data.structure.nodes}
            connections={data.connections}
            rootNodeId={data.structure.rootNodeId}
            onNodeClick={(node) => onNodeClick(node.originalText)}
            highlightedNodeId={highlightedNode}
          />
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-4">Legend</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(LOGIC_ROLE_COLORS).map(([role, colors]) => (
              <div key={role} className="flex items-center gap-3">
                <div 
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '3px',
                    backgroundColor: colors.bg,
                    border: `1.2px solid ${colors.border}`,
                    opacity: '0.7'
                  }}
                ></div>
                <span className="text-xs font-medium text-gray-700">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== ReadingPassage 组件 ====================
const ReadingPassage = ({ paragraphs, translations, onWordClick, highlightedText }) => {
  const [expandedParagraphs, setExpandedParagraphs] = useState(new Set());
  const [flashingParagraph, setFlashingParagraph] = useState(null);
  const paragraphRefs = useRef([]);

  const toggleTranslation = (idx) => {
    setExpandedParagraphs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (highlightedText) {
      const paraIdx = paragraphs.findIndex(p => p.includes(highlightedText));
      if (paraIdx !== -1) {
        setFlashingParagraph(paraIdx);
        paragraphRefs.current[paraIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const timer = setTimeout(() => setFlashingParagraph(null), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [highlightedText, paragraphs]);

  const renderParagraphWithWords = (text) => {
    const words = text.split(/\s+/);
    
    return words.map((word, idx) => {
      const cleanWord = word.replace(/[^\w']/g, '');
      
      return (
        <span key={idx}>
          <span
            onClick={() => onWordClick(cleanWord)}
            className="cursor-pointer hover:bg-amber-50 transition-colors rounded px-0.5 py-0.5 border-b border-amber-200 hover:border-amber-400"
            title="Click to view definition"
          >
            {word}
          </span>
          {idx < words.length - 1 && ' '}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      {paragraphs.map((para, idx) => {
        const isExpanded = expandedParagraphs.has(idx);
        const isFlashing = flashingParagraph === idx;
        const translation = translations[idx];

        return (
          <div
            key={idx}
            ref={el => { paragraphRefs.current[idx] = el; }}
            className={`border-l-3 pl-6 py-4 transition-all duration-300 ${
              isFlashing
                ? 'border-amber-400 bg-amber-50 rounded-sm'
                : 'border-gray-200'
            }`}
          >
            <div
              className="cursor-pointer"
              onClick={() => toggleTranslation(idx)}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="flex-1 text-sm leading-relaxed text-gray-800 select-text font-body">
                  {renderParagraphWithWords(para)}
                </p>
                <button className="text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors mt-0.5">
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>

            {isExpanded && translation && (
              <div className="mt-4 pt-4 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">Chinese Translation</p>
                <p className="text-sm text-gray-700 leading-relaxed font-serif italic">
                  {translation}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ==================== ReadingArea ====================
const ReadingArea = ({ data, onWordClick, onNodeClick, highlightedText }) => {
  const paragraphs = data.content || [];

  return (
    <div className="h-full overflow-auto bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-3">{data.metadata.title}</h1>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>{data.metadata.difficultyLevel}</span>
            <span className="text-gray-400">•</span>
            <span>{data.metadata.suggestedDuration} min read</span>
            {data.metadata.source && (
              <>
                <span className="text-gray-400">•</span>
                <span>{data.metadata.source}</span>
              </>
            )}
          </div>
        </div>

        <div className="mb-8 p-4 bg-gray-50 border-l-3 border-gray-400 rounded-sm">
          <p className="text-xs text-gray-700 font-medium">
            <span className="font-semibold">Tip:</span> Click any word to look it up • Click paragraph to toggle translation
          </p>
        </div>

        <ReadingPassage
          paragraphs={paragraphs}
          translations={data.translations}
          onWordClick={onWordClick}
          highlightedText={highlightedText}
        />
      </div>
    </div>
  );
};

// ==================== VocabularyTab ====================
const VocabularyTab = ({ vocabulary, highlightedWord }) => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [tempVocab, setTempVocab] = useState(null);
  const [isLoadingExternal, setIsLoadingExternal] = useState(false);
  const highlightedRef = useRef(null);

  useEffect(() => {
    if (highlightedWord) {
      const cleanWord = highlightedWord.replace(/[^\w']/g, '');
      const found = vocabulary.find(v => v.word.toLowerCase() === cleanWord.toLowerCase());

      if (found) {
        setSelectedWord(found);
        setTempVocab(null);
      } else {
        setIsLoadingExternal(true);
        fetchExternalDefinition(cleanWord)
          .then(externalDef => {
            const newTempVocab = {
              ...externalDef,
              isExternal: true,
            };
            setTempVocab(newTempVocab);
            setSelectedWord(null);
          })
          .catch(error => {
            console.error('External dictionary lookup failed:', error);
            const fallbackVocab = {
              word: cleanWord,
              partOfSpeech: 'unknown',
              simpleExplanation: `"${cleanWord}" is not in your current vocabulary list. Please consult a dictionary.`,
              spokenExample: `I encountered the word "${cleanWord}" in this text.`,
              writingExample: `The term "${cleanWord}" appears in academic writing.`,
              difficulty: DifficultyLevel.INTERMEDIATE,
              isTemp: true
            };
            setTempVocab(fallbackVocab);
            setSelectedWord(null);
          })
          .finally(() => {
            setIsLoadingExternal(false);
          });
      }

      setTimeout(() => {
        highlightedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
    }
  }, [highlightedWord, vocabulary]);

  const displayVocab = tempVocab ? [tempVocab, ...vocabulary] : vocabulary;

  return (
    <div className="h-full overflow-auto bg-white">
      <div className="max-w-3xl mx-auto px-8 py-12">
        <h3 className="text-lg font-serif font-bold text-gray-800 mb-8">Vocabulary</h3>

        <div className="space-y-5">
          {displayVocab.map((item, idx) => {
            const isHighlighted = highlightedWord?.toLowerCase().includes(item.word.toLowerCase());
            const isTemp = item.isTemp;
            const isExternal = item.isExternal;

            return (
              <div
                key={`${item.word}-${idx}`}
                ref={isHighlighted ? highlightedRef : null}
                className={`border-l-3 pl-6 py-5 rounded-sm transition-all cursor-pointer ${
                  isHighlighted
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${isExternal ? 'bg-amber-50 border-amber-300' : isTemp ? 'border-orange-300 bg-orange-50' : ''}`}
                onClick={() => setSelectedWord(selectedWord?.word === item.word ? null : item)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-serif font-semibold text-gray-900">{item.word}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {item.partOfSpeech || 'unknown'}
                      {isExternal && <span className="ml-2 text-amber-700 font-semibold">📖 From Dictionary</span>}
                      {isTemp && !isExternal && <span className="ml-2 text-orange-700">[Temporary]</span>}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-sm font-medium whitespace-nowrap ${
                      item.difficulty === DifficultyLevel.ADVANCED
                        ? 'bg-red-100 text-red-700'
                        : item.difficulty === DifficultyLevel.INTERMEDIATE
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.difficulty || 'unknown'}
                  </span>
                </div>

                {isLoadingExternal && isHighlighted ? (
                  <div className="flex items-center gap-2 text-sm text-gray-600 py-3">
                    <div className="w-3 h-3 border border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
                    <span>Looking up definition...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-800 leading-relaxed">{item.simpleExplanation}</p>

                    {(selectedWord?.word === item.word || isHighlighted) && (
                      <div className="mt-5 pt-5 border-t border-gray-200 space-y-4 animate-in fade-in">
                        <div>
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Speaking</p>
                          <p className="text-sm text-gray-800 italic">"{item.spokenExample}"</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Writing</p>
                          <p className="text-sm text-gray-800 italic">"{item.writingExample}"</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==================== WritingTab ====================
const WritingTab = ({ vocabulary }) => {
  const [userText, setUserText] = useState('');
  const [usedWords, setUsedWords] = useState(new Set());

  useEffect(() => {
    const lowerText = userText.toLowerCase();
    const newUsedWords = new Set();

    vocabulary.forEach(item => {
      if (lowerText.includes(item.word.toLowerCase())) {
        newUsedWords.add(item.word);
      }
    });

    setUsedWords(newUsedWords);
  }, [userText, vocabulary]);

  const wordCount = userText.trim().split(/\s+/).filter(w => w.length > 0).length;
  const progress = Math.min((usedWords.size / vocabulary.length) * 100, 100);

  return (
    <div className="h-full overflow-auto bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h3 className="text-lg font-serif font-bold text-gray-800 mb-8">Writing Practice</h3>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="border border-gray-200 rounded-sm p-6">
            <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-4">Essay Structure Guide</h4>
            <div className="space-y-3">
              {[
                "1. Introduction – Hook & Thesis",
                "2. Body Para 1 – Main Argument",
                "3. Body Para 2 – Supporting Evidence",
                "4. Body Para 3 – Counter-argument",
                "5. Conclusion – Restatement & Implications"
              ].map((item, idx) => (
                <p key={idx} className="text-xs text-gray-700 leading-relaxed">{item}</p>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-sm p-6">
            <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-4">Vocabulary Tracking</h4>
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-2">
                <span>Used: {usedWords.size}/{vocabulary.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-800">Your Essay</h4>
            <span className="text-xs text-gray-500">{wordCount} words</span>
          </div>
          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Start writing your essay here..."
            className="w-full h-64 p-4 border border-gray-200 rounded-sm text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none leading-relaxed font-body"
          />
        </div>
      </div>
    </div>
  );
};

// ==================== 主应用 ====================
const IELTSInsightApp = () => {
  const [articleData, setArticleData] = useState(defaultMockData);
  const [activeTab, setActiveTab] = useState('mindmap');
  const [highlightedWord, setHighlightedWord] = useState(null);
  const [highlightedText, setHighlightedText] = useState(null);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWordClick = (word) => {
    setActiveTab('vocabulary');
    setHighlightedWord(word);
    setTimeout(() => setHighlightedWord(null), 5000);
  };

  const handleNodeClick = (text) => {
    setHighlightedText(text);
    setTimeout(() => setHighlightedText(null), 3000);
  };

  const handleAnalyze = async (articleText, title) => {
    if (!articleText.trim()) return;
    setIsLoading(true);
    
    try {
      const analysisResult = await analyzeArticleWithAI(articleText, title);
      setArticleData(analysisResult);
      setIsImportOpen(false);
      setActiveTab('mindmap');
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("AI analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'mindmap', label: 'Map', icon: Brain },
    { id: 'vocabulary', label: 'Vocabulary', icon: BookOpen },
    { id: 'writing', label: 'Writing', icon: PenTool }
  ];

  return (
    <div className="h-screen flex flex-col bg-white" style={{ backgroundColor: '#F9F8F5' }}>
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">IELTS Insight</h1>
            <p className="text-xs text-gray-600 mt-1">{articleData.metadata.title}</p>
          </div>
          <button
            onClick={() => setIsImportOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white rounded-sm text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            <Upload size={16} />
            Import Article
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-gray-200 overflow-auto" style={{ backgroundColor: '#F9F8F5' }}>
          <ReadingArea
            data={articleData}
            onWordClick={handleWordClick}
            onNodeClick={handleNodeClick}
            highlightedText={highlightedText}
          />
        </div>

        <div className="w-1/2 flex flex-col bg-white">
          <div className="flex border-b border-gray-200 bg-white">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"></div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'mindmap' && (
              <MindmapTab
                data={articleData}
                onNodeClick={handleNodeClick}
                highlightedNode={highlightedNode}
              />
            )}
            {activeTab === 'vocabulary' && (
              <VocabularyTab
                vocabulary={articleData.vocabulary}
                highlightedWord={highlightedWord}
              />
            )}
            {activeTab === 'writing' && (
              <WritingTab vocabulary={articleData.vocabulary} />
            )}
          </div>
        </div>
      </div>

      <ArticleImportDialog
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onAnalyze={handleAnalyze}
        isLoading={isLoading}
      />

      {isLoading && <LoadingSpinner />}

      <style>{`
        :root {
          --paper-white: #FDFDFB;
          --ink-black: #2D3436;
          --oxford-blue: #35495E;
          --soft-gray: #F1F1EF;
        }

        body { 
          background-color: var(--paper-white) !important; 
          color: var(--ink-black) !important;
          font-family: 'Inter', -apple-system, sans-serif;
          letter-spacing: -0.01em;
        }

        .shadow-sm, .shadow-md, .shadow-lg {
          box-shadow: none !important;
          border: 1px solid var(--soft-gray) !important;
        }

        .text-gray-500.italic {
          display: block;
          margin-top: 1rem;
          padding: 1.25rem;
          background-color: rgba(53, 73, 94, 0.03);
          border-left: 2px solid var(--oxford-blue);
          color: #576574 !important;
          font-style: normal !important;
          font-size: 0.95rem;
          line-height: 1.7;
          border-radius: 0 4px 4px 0;
        }

        h1, h2, h3, .font-serif {
          font-family: 'Merriweather', serif;
          font-weight: 700;
        }

        button.bg-blue-600, button.bg-blue-500 {
          background-color: var(--ink-black) !important;
        }
      `}</style>
    </div>
  );
}

export default IELTSInsightApp;
