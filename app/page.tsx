'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
const QrScanner = dynamic(
  () => import('@yudiel/react-qr-scanner').then(mod => mod.QrScanner),
  { ssr: false }
) as any
import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"

export default function QRCodeApp() {
  const [scannedData, setScannedData] = useState<string>('')
  const [inputData, setInputData] = useState<string>('')

  const handleScan = (result: any) => {
    if (result) {
      setScannedData(result)
    }
  }

  const handleError = (error: any) => {
    console.error(error)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner and Generator</h1>
      <Tabs defaultValue="scan">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
          <TabsTrigger value="generate">Generate QR Code</TabsTrigger>
        </TabsList>
        <TabsContent value="scan">
          <Card>
            <CardHeader>
              <CardTitle>Scan QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full max-w-sm mx-auto">
                <QrScanner
                  onDecode={handleScan}
                  onError={handleError}
                  constraints={{ facingMode: 'environment' }}
                  videoStyle={{ width: '100%', height: 'auto' }}
                  containerStyle={{ paddingTop: '100%', position: 'relative' }}
                />
              </div>
              {scannedData && (
                <>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">Scanned Data:</h2>
                    <p className="break-all">{scannedData}</p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <QRCodeSVG value={scannedData} size={256} />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                placeholder="Enter text or URL"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                className="mb-4"
              />
              <Button onClick={() => setInputData('')}>Clear</Button>
              {inputData && (
                <div className="mt-4 flex justify-center">
                  <QRCodeSVG value={inputData} size={256} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
