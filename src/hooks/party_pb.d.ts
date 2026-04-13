import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace party. */
export namespace party {

    /** Properties of a Join. */
    interface IJoin {

        /** Join partyId */
        partyId?: (number|Long|null);

        /** Join memberId */
        memberId?: (number|Long|null);
    }

    /** Represents a Join. */
    class Join implements IJoin {

        /**
         * Constructs a new Join.
         * @param [properties] Properties to set
         */
        constructor(properties?: party.IJoin);

        /** Join partyId. */
        public partyId: (number|Long);

        /** Join memberId. */
        public memberId: (number|Long);

        /**
         * Creates a new Join instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Join instance
         */
        public static create(properties?: party.IJoin): party.Join;

        /**
         * Encodes the specified Join message. Does not implicitly {@link party.Join.verify|verify} messages.
         * @param message Join message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: party.IJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Join message, length delimited. Does not implicitly {@link party.Join.verify|verify} messages.
         * @param message Join message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: party.IJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Join message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Join
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): party.Join;

        /**
         * Decodes a Join message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Join
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): party.Join;

        /**
         * Verifies a Join message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Join message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Join
         */
        public static fromObject(object: { [k: string]: any }): party.Join;

        /**
         * Creates a plain object from a Join message. Also converts values to other types if specified.
         * @param message Join
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: party.Join, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Join to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Join
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Part. */
    interface IPart {
    }

    /** Represents a Part. */
    class Part implements IPart {

        /**
         * Constructs a new Part.
         * @param [properties] Properties to set
         */
        constructor(properties?: party.IPart);

        /**
         * Creates a new Part instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Part instance
         */
        public static create(properties?: party.IPart): party.Part;

        /**
         * Encodes the specified Part message. Does not implicitly {@link party.Part.verify|verify} messages.
         * @param message Part message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: party.IPart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Part message, length delimited. Does not implicitly {@link party.Part.verify|verify} messages.
         * @param message Part message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: party.IPart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Part message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Part
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): party.Part;

        /**
         * Decodes a Part message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Part
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): party.Part;

        /**
         * Verifies a Part message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Part message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Part
         */
        public static fromObject(object: { [k: string]: any }): party.Part;

        /**
         * Creates a plain object from a Part message. Also converts values to other types if specified.
         * @param message Part
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: party.Part, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Part to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Part
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Data. */
    interface IData {

        /** Data memberId */
        memberId?: (number|Long|null);

        /** Data data */
        data?: (Uint8Array|null);

        /** Data type */
        type?: (string|null);
    }

    /** Represents a Data. */
    class Data implements IData {

        /**
         * Constructs a new Data.
         * @param [properties] Properties to set
         */
        constructor(properties?: party.IData);

        /** Data memberId. */
        public memberId: (number|Long);

        /** Data data. */
        public data: Uint8Array;

        /** Data type. */
        public type: string;

        /**
         * Creates a new Data instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Data instance
         */
        public static create(properties?: party.IData): party.Data;

        /**
         * Encodes the specified Data message. Does not implicitly {@link party.Data.verify|verify} messages.
         * @param message Data message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: party.IData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Data message, length delimited. Does not implicitly {@link party.Data.verify|verify} messages.
         * @param message Data message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: party.IData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Data message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): party.Data;

        /**
         * Decodes a Data message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): party.Data;

        /**
         * Verifies a Data message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Data message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Data
         */
        public static fromObject(object: { [k: string]: any }): party.Data;

        /**
         * Creates a plain object from a Data message. Also converts values to other types if specified.
         * @param message Data
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: party.Data, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Data to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Data
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a C2S. */
    interface IC2S {

        /** C2S join */
        join?: (party.IJoin|null);

        /** C2S part */
        part?: (party.IPart|null);

        /** C2S data */
        data?: (party.IData|null);
    }

    /** Represents a C2S. */
    class C2S implements IC2S {

        /**
         * Constructs a new C2S.
         * @param [properties] Properties to set
         */
        constructor(properties?: party.IC2S);

        /** C2S join. */
        public join?: (party.IJoin|null);

        /** C2S part. */
        public part?: (party.IPart|null);

        /** C2S data. */
        public data?: (party.IData|null);

        /** C2S msg. */
        public msg?: ("join"|"part"|"data");

        /**
         * Creates a new C2S instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S instance
         */
        public static create(properties?: party.IC2S): party.C2S;

        /**
         * Encodes the specified C2S message. Does not implicitly {@link party.C2S.verify|verify} messages.
         * @param message C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: party.IC2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S message, length delimited. Does not implicitly {@link party.C2S.verify|verify} messages.
         * @param message C2S message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: party.IC2S, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): party.C2S;

        /**
         * Decodes a C2S message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): party.C2S;

        /**
         * Verifies a C2S message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2S message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S
         */
        public static fromObject(object: { [k: string]: any }): party.C2S;

        /**
         * Creates a plain object from a C2S message. Also converts values to other types if specified.
         * @param message C2S
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: party.C2S, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for C2S
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a UserJoin. */
    interface IUserJoin {

        /** UserJoin partyId */
        partyId?: (number|Long|null);

        /** UserJoin memberId */
        memberId?: (number|Long|null);
    }

    /** Represents a UserJoin. */
    class UserJoin implements IUserJoin {

        /**
         * Constructs a new UserJoin.
         * @param [properties] Properties to set
         */
        constructor(properties?: party.IUserJoin);

        /** UserJoin partyId. */
        public partyId: (number|Long);

        /** UserJoin memberId. */
        public memberId: (number|Long);

        /**
         * Creates a new UserJoin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserJoin instance
         */
        public static create(properties?: party.IUserJoin): party.UserJoin;

        /**
         * Encodes the specified UserJoin message. Does not implicitly {@link party.UserJoin.verify|verify} messages.
         * @param message UserJoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: party.IUserJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserJoin message, length delimited. Does not implicitly {@link party.UserJoin.verify|verify} messages.
         * @param message UserJoin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: party.IUserJoin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserJoin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): party.UserJoin;

        /**
         * Decodes a UserJoin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): party.UserJoin;

        /**
         * Verifies a UserJoin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserJoin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserJoin
         */
        public static fromObject(object: { [k: string]: any }): party.UserJoin;

        /**
         * Creates a plain object from a UserJoin message. Also converts values to other types if specified.
         * @param message UserJoin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: party.UserJoin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserJoin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UserJoin
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a UserPart. */
    interface IUserPart {

        /** UserPart partyId */
        partyId?: (number|Long|null);

        /** UserPart memberId */
        memberId?: (number|Long|null);
    }

    /** Represents a UserPart. */
    class UserPart implements IUserPart {

        /**
         * Constructs a new UserPart.
         * @param [properties] Properties to set
         */
        constructor(properties?: party.IUserPart);

        /** UserPart partyId. */
        public partyId: (number|Long);

        /** UserPart memberId. */
        public memberId: (number|Long);

        /**
         * Creates a new UserPart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserPart instance
         */
        public static create(properties?: party.IUserPart): party.UserPart;

        /**
         * Encodes the specified UserPart message. Does not implicitly {@link party.UserPart.verify|verify} messages.
         * @param message UserPart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: party.IUserPart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserPart message, length delimited. Does not implicitly {@link party.UserPart.verify|verify} messages.
         * @param message UserPart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: party.IUserPart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserPart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserPart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): party.UserPart;

        /**
         * Decodes a UserPart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserPart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): party.UserPart;

        /**
         * Verifies a UserPart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserPart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserPart
         */
        public static fromObject(object: { [k: string]: any }): party.UserPart;

        /**
         * Creates a plain object from a UserPart message. Also converts values to other types if specified.
         * @param message UserPart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: party.UserPart, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserPart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for UserPart
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PartyData. */
    interface IPartyData {

        /** PartyData partyId */
        partyId?: (number|Long|null);

        /** PartyData memberId */
        memberId?: (number|Long|null);

        /** PartyData data */
        data?: (Uint8Array|null);

        /** PartyData type */
        type?: (string|null);
    }

    /** Represents a PartyData. */
    class PartyData implements IPartyData {

        /**
         * Constructs a new PartyData.
         * @param [properties] Properties to set
         */
        constructor(properties?: party.IPartyData);

        /** PartyData partyId. */
        public partyId: (number|Long);

        /** PartyData memberId. */
        public memberId: (number|Long);

        /** PartyData data. */
        public data: Uint8Array;

        /** PartyData type. */
        public type: string;

        /**
         * Creates a new PartyData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartyData instance
         */
        public static create(properties?: party.IPartyData): party.PartyData;

        /**
         * Encodes the specified PartyData message. Does not implicitly {@link party.PartyData.verify|verify} messages.
         * @param message PartyData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: party.IPartyData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PartyData message, length delimited. Does not implicitly {@link party.PartyData.verify|verify} messages.
         * @param message PartyData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: party.IPartyData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartyData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PartyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): party.PartyData;

        /**
         * Decodes a PartyData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PartyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): party.PartyData;

        /**
         * Verifies a PartyData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PartyData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PartyData
         */
        public static fromObject(object: { [k: string]: any }): party.PartyData;

        /**
         * Creates a plain object from a PartyData message. Also converts values to other types if specified.
         * @param message PartyData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: party.PartyData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PartyData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PartyData
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a S2C. */
    interface IS2C {

        /** S2C join */
        join?: (party.IUserJoin|null);

        /** S2C part */
        part?: (party.IUserPart|null);

        /** S2C data */
        data?: (party.IPartyData|null);
    }

    /** Represents a S2C. */
    class S2C implements IS2C {

        /**
         * Constructs a new S2C.
         * @param [properties] Properties to set
         */
        constructor(properties?: party.IS2C);

        /** S2C join. */
        public join?: (party.IUserJoin|null);

        /** S2C part. */
        public part?: (party.IUserPart|null);

        /** S2C data. */
        public data?: (party.IPartyData|null);

        /** S2C msg. */
        public msg?: ("join"|"part"|"data");

        /**
         * Creates a new S2C instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C instance
         */
        public static create(properties?: party.IS2C): party.S2C;

        /**
         * Encodes the specified S2C message. Does not implicitly {@link party.S2C.verify|verify} messages.
         * @param message S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: party.IS2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C message, length delimited. Does not implicitly {@link party.S2C.verify|verify} messages.
         * @param message S2C message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: party.IS2C, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): party.S2C;

        /**
         * Decodes a S2C message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): party.S2C;

        /**
         * Verifies a S2C message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2C message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C
         */
        public static fromObject(object: { [k: string]: any }): party.S2C;

        /**
         * Creates a plain object from a S2C message. Also converts values to other types if specified.
         * @param message S2C
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: party.S2C, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for S2C
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
