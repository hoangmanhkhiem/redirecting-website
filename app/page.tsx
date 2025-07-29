"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal, Play, CheckCircle, Code2, PiIcon as Python } from "lucide-react"
import { time } from "console"
import { set } from "date-fns"

export default function RedirectPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [currentCode, setCurrentCode] = useState("")

  const codeSteps = [
    {
      code: `# Hello World Python Program
print("Hello, Welcome to my website!")`,
      output: "Hello, Welcome to my website!",
    },
    {
      code: `
# Portfolio URL
portfolio_url = "https://about.khiem.tech"
print(f"Portfolio: {portfolio_url}")
print("Redirecting to portfolio...")`,
      output: "Portfolio: https://about.khiem.tech\nRedirecting to portfolio...",
    }
  ]

  useEffect(() => {
    // Anti-DevTools protection
    const detectDevTools = () => {
      const threshold = 160;
      
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        window.location.reload();
      }
    };

    // Check for DevTools on resize
    const handleResize = () => {
      detectDevTools();
    };

    // Check for DevTools using console.log detection
    let devtools = { open: false };
    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          window.location.reload();
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+C
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        window.location.reload();
        return false;
      }
      
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        window.location.reload();
        return false;
      }
      
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        window.location.reload();
        return false;
      }
      
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        window.location.reload();
        return false;
      }
      
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        window.location.reload();
        return false;
      }
    };

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      window.location.reload();
      return false;
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    // Initial check
    detectDevTools();

    const executeCode = async () => {
      for (let i = 0; i < codeSteps.length; i++) {
        // Type out the code
        const code = codeSteps[i].code
        setCurrentCode("")

        for (let j = 0; j <= code.length; j++) {
          setCurrentCode(code.slice(0, j))
          await new Promise((resolve) => setTimeout(resolve, 30))
        }



        if (i >= 0) {
          // Simulate terminal command execution
          setTerminalOutput((prev) => [...prev, ""])
          await new Promise((resolve) => setTimeout(resolve, 30))
          
          // Add prompt and gradually type the command
          const script_run = "python3 hello_world.py"
          
          // Start with just the prompt (using special marker for colored prompt)
          setTerminalOutput((prev) => [...prev, "PROMPT_ONLY"])
          await new Promise((resolve) => setTimeout(resolve, 500))
          
          // Type the command character by character
          for (let k = 0; k < script_run.length; k++) {
            setTerminalOutput((prev) => [...prev.slice(0, -1), "PROMPT_WITH_COMMAND:" + script_run.slice(0, k + 1)])
            await new Promise((resolve) => setTimeout(resolve, 50))
          }
          
          await new Promise((resolve) => setTimeout(resolve, 300))
        }
        
        // Wait before showing output
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Add output to terminal
        const outputs = codeSteps[i].output.split("\n")
        for (const output of outputs) {
          setTerminalOutput((prev) => [...prev, output])
          await new Promise((resolve) => setTimeout(resolve, 400))
        }
        setCurrentStep(i + 1)
      }

      // Add completion message
      setTerminalOutput((prev) => [...prev, "", "✅ Script execution completed successfully!"])
      await new Promise((resolve) => setTimeout(resolve, 500))

      // // 5-second countdown before redirect
      // for (let countdown = 3; countdown > 0; countdown--) {
      //   setTerminalOutput((prev) => [...prev, `🔄 Redirecting to portfolio in ${countdown} seconds...`])
      //   await new Promise((resolve) => setTimeout(resolve, 1000))
      // }

      setTerminalOutput((prev) => [...prev, "🚀 Opening portfolio now!"])

      // Redirect after countdown
      setTimeout(() => {
        window.location.href = "https://about.khiem.tech"
      }, 500)
    }

    executeCode()

    // Cleanup event listeners
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse" />

      {/* Glowing effects */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="w-full max-w-6xl space-y-6 relative z-10">
        {/* IDE Header */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-t-lg border border-gray-700">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Python className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-mono">hello_world.py</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-mono">Running Python 3.11</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <Card className="bg-gray-900/90 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300 font-mono">Python Editor</span>
                </div>
              </div>
              <div className="p-4 font-mono text-sm min-h-[500px] overflow-auto">
                <pre className="text-gray-300 whitespace-pre-wrap">
                  <code>
                    {currentCode}
                    <span className="animate-pulse bg-blue-400 w-2 h-5 inline-block ml-1"></span>
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Terminal Output */}
          <Card className="bg-black/90 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300 font-mono">Python Terminal</span>
                </div>
              </div>
              <div className="p-4 font-mono text-sm min-h-[500px] space-y-1 overflow-auto">
                {terminalOutput.map((output, index) => (
                  <div key={index} className="text-gray-300 animate-fadeIn leading-relaxed">
                    {output === "PROMPT_ONLY" ? (
                      <div className="text-gray-400">
                        <span className="text-green-400">khiem@dev-machine</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~/redirect</span>
                        <span className="text-white">$ </span>
                      </div>
                    ) : output.startsWith("PROMPT_WITH_COMMAND:") ? (
                      <div className="text-gray-400">
                        <span className="text-green-400">khiem@dev-machine</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">~/redirect</span>
                        <span className="text-white">$ </span>
                        <span className="text-white">{output.replace("PROMPT_WITH_COMMAND:", "")}</span>
                      </div>
                    ) : (
                      output
                    )}
                  </div>
                ))}
                {currentStep === codeSteps.length && (
                  <div className="mt-4 space-y-1">
                    <div className="text-green-400">✅ Script execution completed successfully!</div>
                    <div className="text-cyan-400 animate-pulse">🔄 Redirecting to portfolio in a few seconds...</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300 font-mono">Python Script Execution</span>
            <span className="text-sm text-blue-400 font-mono">
              {currentStep}/{codeSteps.length} methods executed
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / codeSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Status */}
        <div className="text-center">
          {currentStep === codeSteps.length ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-mono">Python script executed successfully! 🐍</span>
              </div>
              <div className="text-cyan-400 animate-pulse font-mono text-sm">Preparing redirect to portfolio...</div>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-blue-400">
              <Python className="w-5 h-5 animate-pulse" />
              <span className="font-mono">Executing Python portfolio redirect script...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
