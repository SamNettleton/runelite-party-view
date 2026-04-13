/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const party = $root.party = (() => {

    /**
     * Namespace party.
     * @exports party
     * @namespace
     */
    const party = {};

    party.Join = (function() {

        /**
         * Properties of a Join.
         * @memberof party
         * @interface IJoin
         * @property {number|Long|null} [partyId] Join partyId
         * @property {number|Long|null} [memberId] Join memberId
         */

        /**
         * Constructs a new Join.
         * @memberof party
         * @classdesc Represents a Join.
         * @implements IJoin
         * @constructor
         * @param {party.IJoin=} [properties] Properties to set
         */
        function Join(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Join partyId.
         * @member {number|Long} partyId
         * @memberof party.Join
         * @instance
         */
        Join.prototype.partyId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Join memberId.
         * @member {number|Long} memberId
         * @memberof party.Join
         * @instance
         */
        Join.prototype.memberId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Join instance using the specified properties.
         * @function create
         * @memberof party.Join
         * @static
         * @param {party.IJoin=} [properties] Properties to set
         * @returns {party.Join} Join instance
         */
        Join.create = function create(properties) {
            return new Join(properties);
        };

        /**
         * Encodes the specified Join message. Does not implicitly {@link party.Join.verify|verify} messages.
         * @function encode
         * @memberof party.Join
         * @static
         * @param {party.IJoin} message Join message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Join.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.partyId != null && Object.hasOwnProperty.call(message, "partyId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.partyId);
            if (message.memberId != null && Object.hasOwnProperty.call(message, "memberId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.memberId);
            return writer;
        };

        /**
         * Encodes the specified Join message, length delimited. Does not implicitly {@link party.Join.verify|verify} messages.
         * @function encodeDelimited
         * @memberof party.Join
         * @static
         * @param {party.IJoin} message Join message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Join.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Join message from the specified reader or buffer.
         * @function decode
         * @memberof party.Join
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {party.Join} Join
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Join.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.party.Join();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.partyId = reader.int64();
                        break;
                    }
                case 2: {
                        message.memberId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Join message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof party.Join
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {party.Join} Join
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Join.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Join message.
         * @function verify
         * @memberof party.Join
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Join.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.partyId != null && message.hasOwnProperty("partyId"))
                if (!$util.isInteger(message.partyId) && !(message.partyId && $util.isInteger(message.partyId.low) && $util.isInteger(message.partyId.high)))
                    return "partyId: integer|Long expected";
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (!$util.isInteger(message.memberId) && !(message.memberId && $util.isInteger(message.memberId.low) && $util.isInteger(message.memberId.high)))
                    return "memberId: integer|Long expected";
            return null;
        };

        /**
         * Creates a Join message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof party.Join
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {party.Join} Join
         */
        Join.fromObject = function fromObject(object) {
            if (object instanceof $root.party.Join)
                return object;
            let message = new $root.party.Join();
            if (object.partyId != null)
                if ($util.Long)
                    (message.partyId = $util.Long.fromValue(object.partyId)).unsigned = false;
                else if (typeof object.partyId === "string")
                    message.partyId = parseInt(object.partyId, 10);
                else if (typeof object.partyId === "number")
                    message.partyId = object.partyId;
                else if (typeof object.partyId === "object")
                    message.partyId = new $util.LongBits(object.partyId.low >>> 0, object.partyId.high >>> 0).toNumber();
            if (object.memberId != null)
                if ($util.Long)
                    (message.memberId = $util.Long.fromValue(object.memberId)).unsigned = false;
                else if (typeof object.memberId === "string")
                    message.memberId = parseInt(object.memberId, 10);
                else if (typeof object.memberId === "number")
                    message.memberId = object.memberId;
                else if (typeof object.memberId === "object")
                    message.memberId = new $util.LongBits(object.memberId.low >>> 0, object.memberId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a Join message. Also converts values to other types if specified.
         * @function toObject
         * @memberof party.Join
         * @static
         * @param {party.Join} message Join
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Join.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.partyId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.partyId = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.memberId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.memberId = options.longs === String ? "0" : 0;
            }
            if (message.partyId != null && message.hasOwnProperty("partyId"))
                if (typeof message.partyId === "number")
                    object.partyId = options.longs === String ? String(message.partyId) : message.partyId;
                else
                    object.partyId = options.longs === String ? $util.Long.prototype.toString.call(message.partyId) : options.longs === Number ? new $util.LongBits(message.partyId.low >>> 0, message.partyId.high >>> 0).toNumber() : message.partyId;
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (typeof message.memberId === "number")
                    object.memberId = options.longs === String ? String(message.memberId) : message.memberId;
                else
                    object.memberId = options.longs === String ? $util.Long.prototype.toString.call(message.memberId) : options.longs === Number ? new $util.LongBits(message.memberId.low >>> 0, message.memberId.high >>> 0).toNumber() : message.memberId;
            return object;
        };

        /**
         * Converts this Join to JSON.
         * @function toJSON
         * @memberof party.Join
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Join.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Join
         * @function getTypeUrl
         * @memberof party.Join
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Join.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/party.Join";
        };

        return Join;
    })();

    party.Part = (function() {

        /**
         * Properties of a Part.
         * @memberof party
         * @interface IPart
         */

        /**
         * Constructs a new Part.
         * @memberof party
         * @classdesc Represents a Part.
         * @implements IPart
         * @constructor
         * @param {party.IPart=} [properties] Properties to set
         */
        function Part(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Part instance using the specified properties.
         * @function create
         * @memberof party.Part
         * @static
         * @param {party.IPart=} [properties] Properties to set
         * @returns {party.Part} Part instance
         */
        Part.create = function create(properties) {
            return new Part(properties);
        };

        /**
         * Encodes the specified Part message. Does not implicitly {@link party.Part.verify|verify} messages.
         * @function encode
         * @memberof party.Part
         * @static
         * @param {party.IPart} message Part message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Part.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Part message, length delimited. Does not implicitly {@link party.Part.verify|verify} messages.
         * @function encodeDelimited
         * @memberof party.Part
         * @static
         * @param {party.IPart} message Part message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Part.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Part message from the specified reader or buffer.
         * @function decode
         * @memberof party.Part
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {party.Part} Part
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Part.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.party.Part();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Part message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof party.Part
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {party.Part} Part
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Part.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Part message.
         * @function verify
         * @memberof party.Part
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Part.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Part message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof party.Part
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {party.Part} Part
         */
        Part.fromObject = function fromObject(object) {
            if (object instanceof $root.party.Part)
                return object;
            return new $root.party.Part();
        };

        /**
         * Creates a plain object from a Part message. Also converts values to other types if specified.
         * @function toObject
         * @memberof party.Part
         * @static
         * @param {party.Part} message Part
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Part.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Part to JSON.
         * @function toJSON
         * @memberof party.Part
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Part.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Part
         * @function getTypeUrl
         * @memberof party.Part
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Part.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/party.Part";
        };

        return Part;
    })();

    party.Data = (function() {

        /**
         * Properties of a Data.
         * @memberof party
         * @interface IData
         * @property {number|Long|null} [memberId] Data memberId
         * @property {Uint8Array|null} [data] Data data
         * @property {string|null} [type] Data type
         */

        /**
         * Constructs a new Data.
         * @memberof party
         * @classdesc Represents a Data.
         * @implements IData
         * @constructor
         * @param {party.IData=} [properties] Properties to set
         */
        function Data(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Data memberId.
         * @member {number|Long} memberId
         * @memberof party.Data
         * @instance
         */
        Data.prototype.memberId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Data data.
         * @member {Uint8Array} data
         * @memberof party.Data
         * @instance
         */
        Data.prototype.data = $util.newBuffer([]);

        /**
         * Data type.
         * @member {string} type
         * @memberof party.Data
         * @instance
         */
        Data.prototype.type = "";

        /**
         * Creates a new Data instance using the specified properties.
         * @function create
         * @memberof party.Data
         * @static
         * @param {party.IData=} [properties] Properties to set
         * @returns {party.Data} Data instance
         */
        Data.create = function create(properties) {
            return new Data(properties);
        };

        /**
         * Encodes the specified Data message. Does not implicitly {@link party.Data.verify|verify} messages.
         * @function encode
         * @memberof party.Data
         * @static
         * @param {party.IData} message Data message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Data.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.memberId != null && Object.hasOwnProperty.call(message, "memberId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.memberId);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.type);
            return writer;
        };

        /**
         * Encodes the specified Data message, length delimited. Does not implicitly {@link party.Data.verify|verify} messages.
         * @function encodeDelimited
         * @memberof party.Data
         * @static
         * @param {party.IData} message Data message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Data message from the specified reader or buffer.
         * @function decode
         * @memberof party.Data
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {party.Data} Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Data.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.party.Data();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.memberId = reader.int64();
                        break;
                    }
                case 2: {
                        message.data = reader.bytes();
                        break;
                    }
                case 3: {
                        message.type = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Data message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof party.Data
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {party.Data} Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Data message.
         * @function verify
         * @memberof party.Data
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Data.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (!$util.isInteger(message.memberId) && !(message.memberId && $util.isInteger(message.memberId.low) && $util.isInteger(message.memberId.high)))
                    return "memberId: integer|Long expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            return null;
        };

        /**
         * Creates a Data message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof party.Data
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {party.Data} Data
         */
        Data.fromObject = function fromObject(object) {
            if (object instanceof $root.party.Data)
                return object;
            let message = new $root.party.Data();
            if (object.memberId != null)
                if ($util.Long)
                    (message.memberId = $util.Long.fromValue(object.memberId)).unsigned = false;
                else if (typeof object.memberId === "string")
                    message.memberId = parseInt(object.memberId, 10);
                else if (typeof object.memberId === "number")
                    message.memberId = object.memberId;
                else if (typeof object.memberId === "object")
                    message.memberId = new $util.LongBits(object.memberId.low >>> 0, object.memberId.high >>> 0).toNumber();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            if (object.type != null)
                message.type = String(object.type);
            return message;
        };

        /**
         * Creates a plain object from a Data message. Also converts values to other types if specified.
         * @function toObject
         * @memberof party.Data
         * @static
         * @param {party.Data} message Data
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Data.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.memberId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.memberId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.type = "";
            }
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (typeof message.memberId === "number")
                    object.memberId = options.longs === String ? String(message.memberId) : message.memberId;
                else
                    object.memberId = options.longs === String ? $util.Long.prototype.toString.call(message.memberId) : options.longs === Number ? new $util.LongBits(message.memberId.low >>> 0, message.memberId.high >>> 0).toNumber() : message.memberId;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            return object;
        };

        /**
         * Converts this Data to JSON.
         * @function toJSON
         * @memberof party.Data
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Data
         * @function getTypeUrl
         * @memberof party.Data
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Data.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/party.Data";
        };

        return Data;
    })();

    party.C2S = (function() {

        /**
         * Properties of a C2S.
         * @memberof party
         * @interface IC2S
         * @property {party.IJoin|null} [join] C2S join
         * @property {party.IPart|null} [part] C2S part
         * @property {party.IData|null} [data] C2S data
         */

        /**
         * Constructs a new C2S.
         * @memberof party
         * @classdesc Represents a C2S.
         * @implements IC2S
         * @constructor
         * @param {party.IC2S=} [properties] Properties to set
         */
        function C2S(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2S join.
         * @member {party.IJoin|null|undefined} join
         * @memberof party.C2S
         * @instance
         */
        C2S.prototype.join = null;

        /**
         * C2S part.
         * @member {party.IPart|null|undefined} part
         * @memberof party.C2S
         * @instance
         */
        C2S.prototype.part = null;

        /**
         * C2S data.
         * @member {party.IData|null|undefined} data
         * @memberof party.C2S
         * @instance
         */
        C2S.prototype.data = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * C2S msg.
         * @member {"join"|"part"|"data"|undefined} msg
         * @memberof party.C2S
         * @instance
         */
        Object.defineProperty(C2S.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["join", "part", "data"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new C2S instance using the specified properties.
         * @function create
         * @memberof party.C2S
         * @static
         * @param {party.IC2S=} [properties] Properties to set
         * @returns {party.C2S} C2S instance
         */
        C2S.create = function create(properties) {
            return new C2S(properties);
        };

        /**
         * Encodes the specified C2S message. Does not implicitly {@link party.C2S.verify|verify} messages.
         * @function encode
         * @memberof party.C2S
         * @static
         * @param {party.IC2S} message C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.join != null && Object.hasOwnProperty.call(message, "join"))
                $root.party.Join.encode(message.join, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.part != null && Object.hasOwnProperty.call(message, "part"))
                $root.party.Part.encode(message.part, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                $root.party.Data.encode(message.data, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified C2S message, length delimited. Does not implicitly {@link party.C2S.verify|verify} messages.
         * @function encodeDelimited
         * @memberof party.C2S
         * @static
         * @param {party.IC2S} message C2S message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S message from the specified reader or buffer.
         * @function decode
         * @memberof party.C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {party.C2S} C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.party.C2S();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.join = $root.party.Join.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.part = $root.party.Part.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.data = $root.party.Data.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof party.C2S
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {party.C2S} C2S
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S message.
         * @function verify
         * @memberof party.C2S
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.join != null && message.hasOwnProperty("join")) {
                properties.msg = 1;
                {
                    let error = $root.party.Join.verify(message.join);
                    if (error)
                        return "join." + error;
                }
            }
            if (message.part != null && message.hasOwnProperty("part")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.party.Part.verify(message.part);
                    if (error)
                        return "part." + error;
                }
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.party.Data.verify(message.data);
                    if (error)
                        return "data." + error;
                }
            }
            return null;
        };

        /**
         * Creates a C2S message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof party.C2S
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {party.C2S} C2S
         */
        C2S.fromObject = function fromObject(object) {
            if (object instanceof $root.party.C2S)
                return object;
            let message = new $root.party.C2S();
            if (object.join != null) {
                if (typeof object.join !== "object")
                    throw TypeError(".party.C2S.join: object expected");
                message.join = $root.party.Join.fromObject(object.join);
            }
            if (object.part != null) {
                if (typeof object.part !== "object")
                    throw TypeError(".party.C2S.part: object expected");
                message.part = $root.party.Part.fromObject(object.part);
            }
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".party.C2S.data: object expected");
                message.data = $root.party.Data.fromObject(object.data);
            }
            return message;
        };

        /**
         * Creates a plain object from a C2S message. Also converts values to other types if specified.
         * @function toObject
         * @memberof party.C2S
         * @static
         * @param {party.C2S} message C2S
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.join != null && message.hasOwnProperty("join")) {
                object.join = $root.party.Join.toObject(message.join, options);
                if (options.oneofs)
                    object.msg = "join";
            }
            if (message.part != null && message.hasOwnProperty("part")) {
                object.part = $root.party.Part.toObject(message.part, options);
                if (options.oneofs)
                    object.msg = "part";
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                object.data = $root.party.Data.toObject(message.data, options);
                if (options.oneofs)
                    object.msg = "data";
            }
            return object;
        };

        /**
         * Converts this C2S to JSON.
         * @function toJSON
         * @memberof party.C2S
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for C2S
         * @function getTypeUrl
         * @memberof party.C2S
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        C2S.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/party.C2S";
        };

        return C2S;
    })();

    party.UserJoin = (function() {

        /**
         * Properties of a UserJoin.
         * @memberof party
         * @interface IUserJoin
         * @property {number|Long|null} [partyId] UserJoin partyId
         * @property {number|Long|null} [memberId] UserJoin memberId
         */

        /**
         * Constructs a new UserJoin.
         * @memberof party
         * @classdesc Represents a UserJoin.
         * @implements IUserJoin
         * @constructor
         * @param {party.IUserJoin=} [properties] Properties to set
         */
        function UserJoin(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserJoin partyId.
         * @member {number|Long} partyId
         * @memberof party.UserJoin
         * @instance
         */
        UserJoin.prototype.partyId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserJoin memberId.
         * @member {number|Long} memberId
         * @memberof party.UserJoin
         * @instance
         */
        UserJoin.prototype.memberId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new UserJoin instance using the specified properties.
         * @function create
         * @memberof party.UserJoin
         * @static
         * @param {party.IUserJoin=} [properties] Properties to set
         * @returns {party.UserJoin} UserJoin instance
         */
        UserJoin.create = function create(properties) {
            return new UserJoin(properties);
        };

        /**
         * Encodes the specified UserJoin message. Does not implicitly {@link party.UserJoin.verify|verify} messages.
         * @function encode
         * @memberof party.UserJoin
         * @static
         * @param {party.IUserJoin} message UserJoin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserJoin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.partyId != null && Object.hasOwnProperty.call(message, "partyId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.partyId);
            if (message.memberId != null && Object.hasOwnProperty.call(message, "memberId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.memberId);
            return writer;
        };

        /**
         * Encodes the specified UserJoin message, length delimited. Does not implicitly {@link party.UserJoin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof party.UserJoin
         * @static
         * @param {party.IUserJoin} message UserJoin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserJoin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserJoin message from the specified reader or buffer.
         * @function decode
         * @memberof party.UserJoin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {party.UserJoin} UserJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserJoin.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.party.UserJoin();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.partyId = reader.int64();
                        break;
                    }
                case 2: {
                        message.memberId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserJoin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof party.UserJoin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {party.UserJoin} UserJoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserJoin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserJoin message.
         * @function verify
         * @memberof party.UserJoin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserJoin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.partyId != null && message.hasOwnProperty("partyId"))
                if (!$util.isInteger(message.partyId) && !(message.partyId && $util.isInteger(message.partyId.low) && $util.isInteger(message.partyId.high)))
                    return "partyId: integer|Long expected";
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (!$util.isInteger(message.memberId) && !(message.memberId && $util.isInteger(message.memberId.low) && $util.isInteger(message.memberId.high)))
                    return "memberId: integer|Long expected";
            return null;
        };

        /**
         * Creates a UserJoin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof party.UserJoin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {party.UserJoin} UserJoin
         */
        UserJoin.fromObject = function fromObject(object) {
            if (object instanceof $root.party.UserJoin)
                return object;
            let message = new $root.party.UserJoin();
            if (object.partyId != null)
                if ($util.Long)
                    (message.partyId = $util.Long.fromValue(object.partyId)).unsigned = false;
                else if (typeof object.partyId === "string")
                    message.partyId = parseInt(object.partyId, 10);
                else if (typeof object.partyId === "number")
                    message.partyId = object.partyId;
                else if (typeof object.partyId === "object")
                    message.partyId = new $util.LongBits(object.partyId.low >>> 0, object.partyId.high >>> 0).toNumber();
            if (object.memberId != null)
                if ($util.Long)
                    (message.memberId = $util.Long.fromValue(object.memberId)).unsigned = false;
                else if (typeof object.memberId === "string")
                    message.memberId = parseInt(object.memberId, 10);
                else if (typeof object.memberId === "number")
                    message.memberId = object.memberId;
                else if (typeof object.memberId === "object")
                    message.memberId = new $util.LongBits(object.memberId.low >>> 0, object.memberId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a UserJoin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof party.UserJoin
         * @static
         * @param {party.UserJoin} message UserJoin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserJoin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.partyId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.partyId = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.memberId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.memberId = options.longs === String ? "0" : 0;
            }
            if (message.partyId != null && message.hasOwnProperty("partyId"))
                if (typeof message.partyId === "number")
                    object.partyId = options.longs === String ? String(message.partyId) : message.partyId;
                else
                    object.partyId = options.longs === String ? $util.Long.prototype.toString.call(message.partyId) : options.longs === Number ? new $util.LongBits(message.partyId.low >>> 0, message.partyId.high >>> 0).toNumber() : message.partyId;
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (typeof message.memberId === "number")
                    object.memberId = options.longs === String ? String(message.memberId) : message.memberId;
                else
                    object.memberId = options.longs === String ? $util.Long.prototype.toString.call(message.memberId) : options.longs === Number ? new $util.LongBits(message.memberId.low >>> 0, message.memberId.high >>> 0).toNumber() : message.memberId;
            return object;
        };

        /**
         * Converts this UserJoin to JSON.
         * @function toJSON
         * @memberof party.UserJoin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserJoin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserJoin
         * @function getTypeUrl
         * @memberof party.UserJoin
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserJoin.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/party.UserJoin";
        };

        return UserJoin;
    })();

    party.UserPart = (function() {

        /**
         * Properties of a UserPart.
         * @memberof party
         * @interface IUserPart
         * @property {number|Long|null} [partyId] UserPart partyId
         * @property {number|Long|null} [memberId] UserPart memberId
         */

        /**
         * Constructs a new UserPart.
         * @memberof party
         * @classdesc Represents a UserPart.
         * @implements IUserPart
         * @constructor
         * @param {party.IUserPart=} [properties] Properties to set
         */
        function UserPart(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserPart partyId.
         * @member {number|Long} partyId
         * @memberof party.UserPart
         * @instance
         */
        UserPart.prototype.partyId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserPart memberId.
         * @member {number|Long} memberId
         * @memberof party.UserPart
         * @instance
         */
        UserPart.prototype.memberId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new UserPart instance using the specified properties.
         * @function create
         * @memberof party.UserPart
         * @static
         * @param {party.IUserPart=} [properties] Properties to set
         * @returns {party.UserPart} UserPart instance
         */
        UserPart.create = function create(properties) {
            return new UserPart(properties);
        };

        /**
         * Encodes the specified UserPart message. Does not implicitly {@link party.UserPart.verify|verify} messages.
         * @function encode
         * @memberof party.UserPart
         * @static
         * @param {party.IUserPart} message UserPart message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserPart.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.partyId != null && Object.hasOwnProperty.call(message, "partyId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.partyId);
            if (message.memberId != null && Object.hasOwnProperty.call(message, "memberId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.memberId);
            return writer;
        };

        /**
         * Encodes the specified UserPart message, length delimited. Does not implicitly {@link party.UserPart.verify|verify} messages.
         * @function encodeDelimited
         * @memberof party.UserPart
         * @static
         * @param {party.IUserPart} message UserPart message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserPart.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserPart message from the specified reader or buffer.
         * @function decode
         * @memberof party.UserPart
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {party.UserPart} UserPart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserPart.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.party.UserPart();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.partyId = reader.int64();
                        break;
                    }
                case 2: {
                        message.memberId = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserPart message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof party.UserPart
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {party.UserPart} UserPart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserPart.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserPart message.
         * @function verify
         * @memberof party.UserPart
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserPart.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.partyId != null && message.hasOwnProperty("partyId"))
                if (!$util.isInteger(message.partyId) && !(message.partyId && $util.isInteger(message.partyId.low) && $util.isInteger(message.partyId.high)))
                    return "partyId: integer|Long expected";
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (!$util.isInteger(message.memberId) && !(message.memberId && $util.isInteger(message.memberId.low) && $util.isInteger(message.memberId.high)))
                    return "memberId: integer|Long expected";
            return null;
        };

        /**
         * Creates a UserPart message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof party.UserPart
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {party.UserPart} UserPart
         */
        UserPart.fromObject = function fromObject(object) {
            if (object instanceof $root.party.UserPart)
                return object;
            let message = new $root.party.UserPart();
            if (object.partyId != null)
                if ($util.Long)
                    (message.partyId = $util.Long.fromValue(object.partyId)).unsigned = false;
                else if (typeof object.partyId === "string")
                    message.partyId = parseInt(object.partyId, 10);
                else if (typeof object.partyId === "number")
                    message.partyId = object.partyId;
                else if (typeof object.partyId === "object")
                    message.partyId = new $util.LongBits(object.partyId.low >>> 0, object.partyId.high >>> 0).toNumber();
            if (object.memberId != null)
                if ($util.Long)
                    (message.memberId = $util.Long.fromValue(object.memberId)).unsigned = false;
                else if (typeof object.memberId === "string")
                    message.memberId = parseInt(object.memberId, 10);
                else if (typeof object.memberId === "number")
                    message.memberId = object.memberId;
                else if (typeof object.memberId === "object")
                    message.memberId = new $util.LongBits(object.memberId.low >>> 0, object.memberId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a UserPart message. Also converts values to other types if specified.
         * @function toObject
         * @memberof party.UserPart
         * @static
         * @param {party.UserPart} message UserPart
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserPart.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.partyId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.partyId = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.memberId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.memberId = options.longs === String ? "0" : 0;
            }
            if (message.partyId != null && message.hasOwnProperty("partyId"))
                if (typeof message.partyId === "number")
                    object.partyId = options.longs === String ? String(message.partyId) : message.partyId;
                else
                    object.partyId = options.longs === String ? $util.Long.prototype.toString.call(message.partyId) : options.longs === Number ? new $util.LongBits(message.partyId.low >>> 0, message.partyId.high >>> 0).toNumber() : message.partyId;
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (typeof message.memberId === "number")
                    object.memberId = options.longs === String ? String(message.memberId) : message.memberId;
                else
                    object.memberId = options.longs === String ? $util.Long.prototype.toString.call(message.memberId) : options.longs === Number ? new $util.LongBits(message.memberId.low >>> 0, message.memberId.high >>> 0).toNumber() : message.memberId;
            return object;
        };

        /**
         * Converts this UserPart to JSON.
         * @function toJSON
         * @memberof party.UserPart
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserPart.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserPart
         * @function getTypeUrl
         * @memberof party.UserPart
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserPart.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/party.UserPart";
        };

        return UserPart;
    })();

    party.PartyData = (function() {

        /**
         * Properties of a PartyData.
         * @memberof party
         * @interface IPartyData
         * @property {number|Long|null} [partyId] PartyData partyId
         * @property {number|Long|null} [memberId] PartyData memberId
         * @property {Uint8Array|null} [data] PartyData data
         * @property {string|null} [type] PartyData type
         */

        /**
         * Constructs a new PartyData.
         * @memberof party
         * @classdesc Represents a PartyData.
         * @implements IPartyData
         * @constructor
         * @param {party.IPartyData=} [properties] Properties to set
         */
        function PartyData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PartyData partyId.
         * @member {number|Long} partyId
         * @memberof party.PartyData
         * @instance
         */
        PartyData.prototype.partyId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PartyData memberId.
         * @member {number|Long} memberId
         * @memberof party.PartyData
         * @instance
         */
        PartyData.prototype.memberId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PartyData data.
         * @member {Uint8Array} data
         * @memberof party.PartyData
         * @instance
         */
        PartyData.prototype.data = $util.newBuffer([]);

        /**
         * PartyData type.
         * @member {string} type
         * @memberof party.PartyData
         * @instance
         */
        PartyData.prototype.type = "";

        /**
         * Creates a new PartyData instance using the specified properties.
         * @function create
         * @memberof party.PartyData
         * @static
         * @param {party.IPartyData=} [properties] Properties to set
         * @returns {party.PartyData} PartyData instance
         */
        PartyData.create = function create(properties) {
            return new PartyData(properties);
        };

        /**
         * Encodes the specified PartyData message. Does not implicitly {@link party.PartyData.verify|verify} messages.
         * @function encode
         * @memberof party.PartyData
         * @static
         * @param {party.IPartyData} message PartyData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PartyData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.partyId != null && Object.hasOwnProperty.call(message, "partyId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.partyId);
            if (message.memberId != null && Object.hasOwnProperty.call(message, "memberId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.memberId);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.type);
            return writer;
        };

        /**
         * Encodes the specified PartyData message, length delimited. Does not implicitly {@link party.PartyData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof party.PartyData
         * @static
         * @param {party.IPartyData} message PartyData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PartyData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PartyData message from the specified reader or buffer.
         * @function decode
         * @memberof party.PartyData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {party.PartyData} PartyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PartyData.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.party.PartyData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.partyId = reader.int64();
                        break;
                    }
                case 2: {
                        message.memberId = reader.int64();
                        break;
                    }
                case 3: {
                        message.data = reader.bytes();
                        break;
                    }
                case 4: {
                        message.type = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PartyData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof party.PartyData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {party.PartyData} PartyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PartyData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PartyData message.
         * @function verify
         * @memberof party.PartyData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PartyData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.partyId != null && message.hasOwnProperty("partyId"))
                if (!$util.isInteger(message.partyId) && !(message.partyId && $util.isInteger(message.partyId.low) && $util.isInteger(message.partyId.high)))
                    return "partyId: integer|Long expected";
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (!$util.isInteger(message.memberId) && !(message.memberId && $util.isInteger(message.memberId.low) && $util.isInteger(message.memberId.high)))
                    return "memberId: integer|Long expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            return null;
        };

        /**
         * Creates a PartyData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof party.PartyData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {party.PartyData} PartyData
         */
        PartyData.fromObject = function fromObject(object) {
            if (object instanceof $root.party.PartyData)
                return object;
            let message = new $root.party.PartyData();
            if (object.partyId != null)
                if ($util.Long)
                    (message.partyId = $util.Long.fromValue(object.partyId)).unsigned = false;
                else if (typeof object.partyId === "string")
                    message.partyId = parseInt(object.partyId, 10);
                else if (typeof object.partyId === "number")
                    message.partyId = object.partyId;
                else if (typeof object.partyId === "object")
                    message.partyId = new $util.LongBits(object.partyId.low >>> 0, object.partyId.high >>> 0).toNumber();
            if (object.memberId != null)
                if ($util.Long)
                    (message.memberId = $util.Long.fromValue(object.memberId)).unsigned = false;
                else if (typeof object.memberId === "string")
                    message.memberId = parseInt(object.memberId, 10);
                else if (typeof object.memberId === "number")
                    message.memberId = object.memberId;
                else if (typeof object.memberId === "object")
                    message.memberId = new $util.LongBits(object.memberId.low >>> 0, object.memberId.high >>> 0).toNumber();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            if (object.type != null)
                message.type = String(object.type);
            return message;
        };

        /**
         * Creates a plain object from a PartyData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof party.PartyData
         * @static
         * @param {party.PartyData} message PartyData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PartyData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.partyId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.partyId = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.memberId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.memberId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.type = "";
            }
            if (message.partyId != null && message.hasOwnProperty("partyId"))
                if (typeof message.partyId === "number")
                    object.partyId = options.longs === String ? String(message.partyId) : message.partyId;
                else
                    object.partyId = options.longs === String ? $util.Long.prototype.toString.call(message.partyId) : options.longs === Number ? new $util.LongBits(message.partyId.low >>> 0, message.partyId.high >>> 0).toNumber() : message.partyId;
            if (message.memberId != null && message.hasOwnProperty("memberId"))
                if (typeof message.memberId === "number")
                    object.memberId = options.longs === String ? String(message.memberId) : message.memberId;
                else
                    object.memberId = options.longs === String ? $util.Long.prototype.toString.call(message.memberId) : options.longs === Number ? new $util.LongBits(message.memberId.low >>> 0, message.memberId.high >>> 0).toNumber() : message.memberId;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            return object;
        };

        /**
         * Converts this PartyData to JSON.
         * @function toJSON
         * @memberof party.PartyData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PartyData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PartyData
         * @function getTypeUrl
         * @memberof party.PartyData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PartyData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/party.PartyData";
        };

        return PartyData;
    })();

    party.S2C = (function() {

        /**
         * Properties of a S2C.
         * @memberof party
         * @interface IS2C
         * @property {party.IUserJoin|null} [join] S2C join
         * @property {party.IUserPart|null} [part] S2C part
         * @property {party.IPartyData|null} [data] S2C data
         */

        /**
         * Constructs a new S2C.
         * @memberof party
         * @classdesc Represents a S2C.
         * @implements IS2C
         * @constructor
         * @param {party.IS2C=} [properties] Properties to set
         */
        function S2C(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C join.
         * @member {party.IUserJoin|null|undefined} join
         * @memberof party.S2C
         * @instance
         */
        S2C.prototype.join = null;

        /**
         * S2C part.
         * @member {party.IUserPart|null|undefined} part
         * @memberof party.S2C
         * @instance
         */
        S2C.prototype.part = null;

        /**
         * S2C data.
         * @member {party.IPartyData|null|undefined} data
         * @memberof party.S2C
         * @instance
         */
        S2C.prototype.data = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * S2C msg.
         * @member {"join"|"part"|"data"|undefined} msg
         * @memberof party.S2C
         * @instance
         */
        Object.defineProperty(S2C.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["join", "part", "data"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new S2C instance using the specified properties.
         * @function create
         * @memberof party.S2C
         * @static
         * @param {party.IS2C=} [properties] Properties to set
         * @returns {party.S2C} S2C instance
         */
        S2C.create = function create(properties) {
            return new S2C(properties);
        };

        /**
         * Encodes the specified S2C message. Does not implicitly {@link party.S2C.verify|verify} messages.
         * @function encode
         * @memberof party.S2C
         * @static
         * @param {party.IS2C} message S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.join != null && Object.hasOwnProperty.call(message, "join"))
                $root.party.UserJoin.encode(message.join, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.part != null && Object.hasOwnProperty.call(message, "part"))
                $root.party.UserPart.encode(message.part, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                $root.party.PartyData.encode(message.data, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2C message, length delimited. Does not implicitly {@link party.S2C.verify|verify} messages.
         * @function encodeDelimited
         * @memberof party.S2C
         * @static
         * @param {party.IS2C} message S2C message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C message from the specified reader or buffer.
         * @function decode
         * @memberof party.S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {party.S2C} S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.party.S2C();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.join = $root.party.UserJoin.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.part = $root.party.UserPart.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.data = $root.party.PartyData.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof party.S2C
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {party.S2C} S2C
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C message.
         * @function verify
         * @memberof party.S2C
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.join != null && message.hasOwnProperty("join")) {
                properties.msg = 1;
                {
                    let error = $root.party.UserJoin.verify(message.join);
                    if (error)
                        return "join." + error;
                }
            }
            if (message.part != null && message.hasOwnProperty("part")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.party.UserPart.verify(message.part);
                    if (error)
                        return "part." + error;
                }
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.party.PartyData.verify(message.data);
                    if (error)
                        return "data." + error;
                }
            }
            return null;
        };

        /**
         * Creates a S2C message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof party.S2C
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {party.S2C} S2C
         */
        S2C.fromObject = function fromObject(object) {
            if (object instanceof $root.party.S2C)
                return object;
            let message = new $root.party.S2C();
            if (object.join != null) {
                if (typeof object.join !== "object")
                    throw TypeError(".party.S2C.join: object expected");
                message.join = $root.party.UserJoin.fromObject(object.join);
            }
            if (object.part != null) {
                if (typeof object.part !== "object")
                    throw TypeError(".party.S2C.part: object expected");
                message.part = $root.party.UserPart.fromObject(object.part);
            }
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".party.S2C.data: object expected");
                message.data = $root.party.PartyData.fromObject(object.data);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2C message. Also converts values to other types if specified.
         * @function toObject
         * @memberof party.S2C
         * @static
         * @param {party.S2C} message S2C
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (message.join != null && message.hasOwnProperty("join")) {
                object.join = $root.party.UserJoin.toObject(message.join, options);
                if (options.oneofs)
                    object.msg = "join";
            }
            if (message.part != null && message.hasOwnProperty("part")) {
                object.part = $root.party.UserPart.toObject(message.part, options);
                if (options.oneofs)
                    object.msg = "part";
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                object.data = $root.party.PartyData.toObject(message.data, options);
                if (options.oneofs)
                    object.msg = "data";
            }
            return object;
        };

        /**
         * Converts this S2C to JSON.
         * @function toJSON
         * @memberof party.S2C
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for S2C
         * @function getTypeUrl
         * @memberof party.S2C
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        S2C.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/party.S2C";
        };

        return S2C;
    })();

    return party;
})();

export { $root as default };
