import { Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    'Realistic',
    'Ghibli style',
    'Anime style',
    'Cartoon style',
    'Fantasy style',
    'Realistic style',
    '3D style',
    'Portrait style',
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Handle image generation logic
    console.log('Generate image for:', input, selectedStyle, 'Public:', publish);
    try {
      setLoading(true)
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`

      const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left Column - Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        {/* Image Description */}
        <p className="mt-6 text-sm font-medium">Describe your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to see in the image..."
          required
        />

        {/* Style Selection */}
        <p className="mt-4 text-sm font-medium">Style</p>
        <div className="mt-3 flex gap-3 flex-wrap">
          {imageStyle.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer transition ${selectedStyle === item
                  ? 'bg-green-50 text-green-700 border-green-300'
                  : 'text-gray-500 border-gray-300 hover:bg-gray-100'
                }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer inline-block w-9 h-5">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
            <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-4"></div>
          </label>
          <p className="text-sm">Make this image Public</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-2 text-sm rounded-lg cursor-pointer hover:opacity-90 transition"
        >
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <Image className="w-5" />
          }
          Generate Image
        </button>
      </form>

      {/* Right Column - Output */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3 mb-4">
          <Image className="w-5 h-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">Generated image</h1>
        </div>

        {/* Placeholder */}
        {
          !content ? (
            <div className="flex-1 flex justify-center items-center text-sm flex-col gap-5 text-gray-400">
              <Image className="w-9 h-9" />
              <p>Enter a description and click "Generate Image" to get started</p>
            </div>
          ) : (
            <div className='mt-3 h-full'>
              <img src={content} alt="image" className='w-full h-full'/>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default GenerateImages;
