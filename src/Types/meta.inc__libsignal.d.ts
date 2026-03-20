declare module '@meta.inc/libsignal' {
    export class ProtocolAddress {
        constructor(name: string, deviceId: number)
        toString(): string
    }

    export class SessionRecord {
        static deserialize(data: Uint8Array): SessionRecord
        serialize(): Uint8Array
        haveOpenSession(): boolean
    }

    export class SessionCipher {
        constructor(storage: any, address: ProtocolAddress)
        decryptPreKeyWhisperMessage(ciphertext: Uint8Array): Promise<Buffer>
        decryptWhisperMessage(ciphertext: Uint8Array): Promise<Buffer>
        encrypt(data: Uint8Array): Promise<{ type: number; body: string }>
    }

    export class SessionBuilder {
        constructor(storage: any, address: ProtocolAddress)
        initOutgoing(session: any): Promise<void>
    }

    export interface SignalStorage {
        loadSession(id: string): Promise<SessionRecord | null>
        storeSession(id: string, session: SessionRecord): Promise<void>
        isTrustedIdentity(id: string, key: Uint8Array): Promise<boolean>
        loadPreKey(id: number | string): Promise<{ privKey: Buffer; pubKey: Buffer } | undefined>
        removePreKey(id: number): Promise<void>
        loadSignedPreKey(id: number): Promise<{ privKey: Buffer; pubKey: Buffer }>
        getOurRegistrationId(): number
        getOurIdentity(): { privKey: Buffer; pubKey: Buffer }
    }
}

declare module '@meta.inc/libsignal/src/curve'
declare module '@meta.inc/libsignal/src/crypto'
declare module '@meta.inc/libsignal/src/protobufs'