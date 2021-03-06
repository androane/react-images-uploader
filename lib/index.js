'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _reactProgressButton = require('react-progress-button');

var _reactProgressButton2 = _interopRequireDefault(_reactProgressButton);

require('babel-core/register');

require('babel-polyfill');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

_axios2.default.defaults.xsrfHeaderName = "X-CSRFToken";
_axios2.default.defaults.xsrfCookieName = "csrftoken";

var ImagesUploader = (_class = function (_Component) {
	(0, _inherits3.default)(ImagesUploader, _Component);

	/* eslint-disable react/sort-comp */
	function ImagesUploader(props) {
		(0, _classCallCheck3.default)(this, ImagesUploader);

		var _this = (0, _possibleConstructorReturn3.default)(this, (ImagesUploader.__proto__ || Object.getPrototypeOf(ImagesUploader)).call(this, props));

		var imagePreviewUrls = [];
		if (_this.props.images && _this.props.multiple !== false) {
			imagePreviewUrls = _this.props.images || [];
		}
		if (_this.props.image && _this.props.multiple === false) {
			imagePreviewUrls = [_this.props.image];
		}
		_this.state = {
			imagePreviewUrls: imagePreviewUrls,
			loadState: '',
			filesListState: [],
			optimisticPreviews: [],
			displayNotification: false
		};
		_this.input = null;
		return _this;
	}

	(0, _createClass3.default)(ImagesUploader, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			document.addEventListener('dragover', function (event) {
				// prevent default to allow drop
				event.preventDefault();
			}, false);
			document.addEventListener('drop', function (event) {
				// prevent default to allow drop
				event.preventDefault();
			}, false);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!this.props.images && nextProps.images && nextProps.multiple !== false) {
				this.setState({
					imagePreviewUrls: nextProps.images
				});
			}
			if (!this.props.image && nextProps.image && nextProps.multiple === false) {
				this.setState({
					imagePreviewUrls: [nextProps.image]
				});
			}
		}
	}, {
		key: 'deleteImage',
		value: function deleteImage(key) {
			if (!this.props.disabled) {
				var _imagePreviewUrls = void 0;
				if (this.props.liveUpload) {
					_imagePreviewUrls = this.state.imagePreviewUrls;
				} else {
					var filesListState = this.state.filesListState;
					filesListState.splice(key, 1);
					this.setState({
						filesListState: filesListState
					});
					_imagePreviewUrls = this.state.optimisticPreviews;
				}
				_imagePreviewUrls.splice(key, 1);
				this.setState({
					imagePreviewUrls: _imagePreviewUrls,
					loadState: ''
				});
				if (this.props.deleteImage && typeof this.props.deleteImage === 'function') {
					this.props.deleteImage(key);
				}
			}
		}
	}, {
		key: 'buildPreviews',
		value: function buildPreviews(urls, optimisticUrls, inButton) {
			var _this2 = this;

			var _props = this.props,
			    classNamespace = _props.classNamespace,
			    disabled = _props.disabled,
			    classNames = _props.classNames,
			    styles = _props.styles,
			    color = _props.color,
			    disabledColor = _props.disabledColor,
			    borderColor = _props.borderColor,
			    disabledBorderColor = _props.disabledBorderColor,
			    notificationBgColor = _props.notificationBgColor,
			    notificationColor = _props.notificationColor,
			    deleteElement = _props.deleteElement,
			    plusElement = _props.plusElement;

			if ((!urls || urls.length < 1) && (!optimisticUrls || optimisticUrls.length < 1)) {
				return _react2.default.createElement('div', {
					className: classNames.emptyPreview || classNamespace + 'emptyPreview',
					style: styles.emptyPreview
				});
			}
			var previews = [];
			if (this.props.liveUpload) {
				var multiple = this.props.multiple;
				if (urls && urls.length > 0 && !(multiple === false && optimisticUrls && optimisticUrls.length > 0)) {
					previews = urls.map(function (url, key) {
						if (url) {
							var imgPreviewStyle = {
								backgroundImage: 'url(' + url + ')',
								borderColor: disabled ? disabledBorderColor : borderColor
							};

							if (_this2.props.size) {
								imgPreviewStyle = (0, _extends3.default)({}, imgPreviewStyle, {
									width: _this2.props.size,
									height: _this2.props.size
								}, styles.imagePreview || {});
							}

							var deletePreviewStyle = (0, _extends3.default)({
								color: disabled ? disabledColor : color,
								borderColor: disabled ? disabledBorderColor : borderColor
							}, styles.deletePreview || {});

							return _react2.default.createElement(
								'div',
								{
									className: classNames.imgPreview || classNamespace + 'imgPreview',
									key: key,
									style: imgPreviewStyle },
								!inButton ? _react2.default.createElement(
									'div',
									{
										className: classNames.deletePreview || classNamespace + 'deletePreview',
										style: deletePreviewStyle,
										onClick: function onClick(e) {
											e.preventDefault();
											_this2.deleteImage(key);
										} },
									deleteElement || _react2.default.createElement(
										'svg',
										{ xmlns: 'http://www.w3.org/2000/svg', width: '7.969', height: '8',
											viewBox: '0 0 7.969 8' },
										_react2.default.createElement('path', {
											id: 'X_Icon',
											'data-name': 'X Icon',
											style: {
												fill: disabled ? disabledColor : color,
												fillRule: 'evenodd'
											}
											/* eslint-disable max-len */
											, d: 'M562.036,606l2.849-2.863a0.247,0.247,0,0,0,0-.352l-0.7-.706a0.246,0.246,0,0,0-.352,0l-2.849,2.862-2.849-2.862a0.247,0.247,0,0,0-.352,0l-0.7.706a0.249,0.249,0,0,0,0,.352L559.927,606l-2.849,2.862a0.25,0.25,0,0,0,0,.353l0.7,0.706a0.249,0.249,0,0,0,.352,0l2.849-2.862,2.849,2.862a0.249,0.249,0,0,0,.352,0l0.7-.706a0.25,0.25,0,0,0,0-.353Z'
											/* eslint-enable max-len */
											, transform: 'translate(-557 -602)'
										})
									)
								) : _react2.default.createElement(
									'div',
									{
										className: classNames.notification || classNamespace + 'notification',
										style: styles.notification ? (0, _extends3.default)({}, styles.notification, {
											display: _this2.state.displayNotification ? 'block' : 'none',
											backgroundColor: notificationBgColor,
											color: notificationColor
										}) : {
											display: _this2.state.displayNotification ? 'block' : 'none',
											backgroundColor: notificationBgColor,
											color: notificationColor
										} },
									_react2.default.createElement(
										'span',
										null,
										_this2.props.notification || _this2.buildPlus(disabled, notificationColor, disabledColor, plusElement)
									)
								)
							);
						}
						return null;
					});
				}
				if (optimisticUrls && optimisticUrls.length > 0) {
					var length = previews.length;
					previews = previews.concat(optimisticUrls.map(function (url, key) {
						if (url) {
							var imgPreviewStyle = {
								backgroundImage: 'url(' + url + ')',
								borderColor: disabled ? disabledBorderColor : borderColor
							};

							if (_this2.props.size) {
								imgPreviewStyle = (0, _extends3.default)({}, imgPreviewStyle, {
									width: _this2.props.size,
									height: _this2.props.size
								}, styles.imgPreview || {});
							}

							return _react2.default.createElement('div', {
								className: classNames.imgPreview || classNamespace + 'imgPreview',
								key: length + key,
								style: imgPreviewStyle
							});
						}
						return null;
					}));
				}
			} else {
				if (optimisticUrls && optimisticUrls.length > 0) {
					previews = optimisticUrls.map(function (url, key) {
						if (url) {
							var imgPreviewStyle = {
								backgroundImage: 'url(' + url + ')',
								borderColor: disabled ? disabledBorderColor : borderColor
							};

							if (_this2.props.size) {
								imgPreviewStyle = (0, _extends3.default)({}, imgPreviewStyle, {
									width: _this2.props.size,
									height: _this2.props.size
								}, styles.imagePreview || {});
							}

							var deletePreviewStyle = (0, _extends3.default)({
								color: disabled ? disabledColor : color,
								borderColor: disabled ? disabledBorderColor : borderColor
							}, styles.deletePreview || {});
							return _react2.default.createElement(
								'div',
								{
									className: classNames.imgPreview || classNamespace + 'imgPreview',
									key: key,
									style: imgPreviewStyle },
								!inButton ? _react2.default.createElement(
									'div',
									{
										className: classNames.deletePreview || classNamespace + 'deletePreview',
										style: deletePreviewStyle,
										onClick: function onClick(e) {
											e.preventDefault();
											_this2.deleteImage(key);
										} },
									deleteElement || _react2.default.createElement(
										'svg',
										{ xmlns: 'http://www.w3.org/2000/svg', width: '7.969', height: '8',
											viewBox: '0 0 7.969 8' },
										_react2.default.createElement('path', {
											id: 'X_Icon',
											'data-name': 'X Icon',
											style: {
												fill: disabled ? disabledColor : color,
												fillRule: 'evenodd'
											}
											/* eslint-disable max-len */
											, d: 'M562.036,606l2.849-2.863a0.247,0.247,0,0,0,0-.352l-0.7-.706a0.246,0.246,0,0,0-.352,0l-2.849,2.862-2.849-2.862a0.247,0.247,0,0,0-.352,0l-0.7.706a0.249,0.249,0,0,0,0,.352L559.927,606l-2.849,2.862a0.25,0.25,0,0,0,0,.353l0.7,0.706a0.249,0.249,0,0,0,.352,0l2.849-2.862,2.849,2.862a0.249,0.249,0,0,0,.352,0l0.7-.706a0.25,0.25,0,0,0,0-.353Z'
											/* eslint-enable max-len */
											, transform: 'translate(-557 -602)'
										})
									)
								) : _react2.default.createElement(
									'div',
									{
										className: classNames.notification || classNamespace + 'notification',
										style: styles.notification ? (0, _extends3.default)({}, styles.notification, {
											display: _this2.state.displayNotification ? 'block' : 'none',
											backgroundColor: notificationBgColor,
											color: notificationColor
										}) : {
											display: _this2.state.displayNotification ? 'block' : 'none',
											backgroundColor: notificationBgColor,
											color: notificationColor
										} },
									_react2.default.createElement(
										'span',
										null,
										_this2.props.notification || _this2.buildPlus(disabled, notificationColor, disabledColor, plusElement)
									)
								)
							);
						}
						return null;
					});
				}
			}
			return previews;
		}
	}, {
		key: 'loadImages',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, files, onLoadEnd) {
				var _this3 = this;

				var imageFormData, i, _i;

				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!url) {
									_context.next = 17;
									break;
								}

								_context.prev = 1;
								imageFormData = new FormData();

								if (!this.props.liveUpload) {
									_context.next = 7;
									break;
								}

								for (i = 0; i < files.length; i++) {
									imageFormData.append(this.props.dataName, files[i], files[i].name);
								}
								_context.next = 10;
								break;

							case 7:
								for (_i = 0; _i < this.state.filesListState.length; _i++) {
									imageFormData.append(this.props.dataName, this.state.filesListState[_i], this.state.filesListState[_i].name);
								}

								if (!(this.state.filesListState.length === 0)) {
									_context.next = 10;
									break;
								}

								return _context.abrupt('return');

							case 10:
								return _context.abrupt('return', _axios2.default.post(url, imageFormData).then(function (response) {
									if (response && response.status && response.status === 200) {
										var multiple = _this3.props.multiple;
										var data = response.data;
										if (data instanceof Array || typeof data === 'string') {
											var _imagePreviewUrls2 = [];
											if (multiple === false) {
												_imagePreviewUrls2 = data instanceof Array ? data : [data];
											} else {
												_imagePreviewUrls2 = _this3.state.imagePreviewUrls.concat(data);
											}
											_this3.setState({
												imagePreviewUrls: _imagePreviewUrls2,
												optimisticPreviews: [],
												loadState: 'success'
											});
											if (onLoadEnd && typeof onLoadEnd === 'function') {
												onLoadEnd(false, response);
											}
										} else {
											var err = {
												message: 'invalid response type',
												response: response,
												fileName: 'ImagesUploader'
											};
											_this3.setState({
												loadState: 'error',
												optimisticPreviews: []
											});
											if (onLoadEnd && typeof onLoadEnd === 'function') {
												onLoadEnd(err);
											}
										}
									} else {
										var _err = {
											message: 'server error',
											status: response ? response.status : false,
											fileName: 'ImagesUploader'
										};
										_this3.setState({
											loadState: 'error',
											optimisticPreviews: []
										});
										if (onLoadEnd && typeof onLoadEnd === 'function') {
											onLoadEnd(_err);
										}
									}
									return response;
								}));

							case 13:
								_context.prev = 13;
								_context.t0 = _context['catch'](1);

								if (onLoadEnd && typeof onLoadEnd === 'function') {
									onLoadEnd(_context.t0);
								}
								this.setState({
									loadState: 'error',
									optimisticPreviews: []
								});

							case 17:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[1, 13]]);
			}));

			function loadImages(_x, _x2, _x3) {
				return _ref.apply(this, arguments);
			}

			return loadImages;
		}()
	}, {
		key: 'handleImageChange',
		value: function handleImageChange(e) {
			var _this4 = this;

			e.preventDefault();
			var filesList;
			if (!this.props.liveUpload) {
				var _state$filesListState;

				filesList = [];
				for (var i = 0; i < Math.min(this.props.maxImages - this.state.filesListState.length, e.target.files.length); i++) {
					filesList[i] = e.target.files[i];
				}
				this.setState({ filesListState: (_state$filesListState = this.state.filesListState).concat.apply(_state$filesListState, (0, _toConsumableArray3.default)(filesList)) });
			} else {
				filesList = [];
				for (var _i2 = 0; _i2 < Math.min(this.props.maxImages - this.state.imagePreviewUrls.length, e.target.files.length); _i2++) {
					filesList[_i2] = e.target.files[_i2];
				}
			}
			var _props2 = this.props,
			    onLoadStart = _props2.onLoadStart,
			    onLoadEnd = _props2.onLoadEnd,
			    url = _props2.url,
			    optimisticPreviews = _props2.optimisticPreviews,
			    multiple = _props2.multiple;


			if (onLoadStart && typeof onLoadStart === 'function') {
				onLoadStart();
			}

			this.setState({
				loadState: 'loading'
			});

			if (this.props.max && filesList.length + this.state.imagePreviewUrls.length > this.props.max) {
				var err = {
					message: 'exceeded the number'
				};
				this.setState({
					loadState: 'error',
					optimisticPreviews: []
				});
				if (onLoadEnd && typeof onLoadEnd === 'function') {
					onLoadEnd(err);
				}
				return;
			}

			for (var _i3 = 0; _i3 < filesList.length; _i3++) {
				var file = filesList[_i3];

				if (optimisticPreviews) {
					var reader = new FileReader();
					reader.onload = function (upload) {
						if (multiple === false) {
							_this4.setState({
								optimisticPreviews: [upload.target.result]
							});
						} else {
							var prevOptimisticPreviews = _this4.state.optimisticPreviews;
							_this4.setState({
								optimisticPreviews: prevOptimisticPreviews.concat(upload.target.result)
							});
						}
					};
					reader.readAsDataURL(file);
				}

				if (!file.type.match('image.*')) {
					var _err2 = {
						message: 'file type error',
						type: file.type,
						fileName: 'ImagesUploader'
					};
					if (onLoadEnd && typeof onLoadEnd === 'function') {
						onLoadEnd(_err2);
					}
					this.setState({
						loadState: 'error'
					});
					return;
				}
			}

			if (this.props.liveUpload) {
				if (url) {
					this.loadImages(url, filesList, onLoadEnd);
				}
			} else {
				this.setState({
					loadState: 'success'
				});
			}
		}
	}, {
		key: 'handleFileDrop',
		value: function handleFileDrop(files) {
			if (!this.props.disabled) {
				this.handleImageChange({
					preventDefault: function preventDefault() {
						return true;
					},
					target: {
						files: files
					}
				});
			}
		}

		/* eslint-disable max-len, no-undef */

	}, {
		key: 'buildPlus',
		value: function buildPlus(disabled, color, disabledColor, plusElement) {
			if (this.props.liveUpload && this.state.imagePreviewUrls && this.state.imagePreviewUrls.length >= this.props.maxImages) {
				return _react2.default.createElement('div', null);
			}
			if (!this.props.liveUpload && this.state.filesListState.length >= this.props.maxImages) {
				return _react2.default.createElement('div', null);
			}
			return plusElement || _react2.default.createElement(
				'svg',
				{
					version: '1.1',
					xmlns: 'http://www.w3.org/2000/svg',
					style: {
						width: 35,
						fill: disabled ? disabledColor : color
					},
					xmlnsXlink: 'http://www.w3.org/1999/xlink',
					x: '0px',
					y: '0px',
					viewBox: '0 0 1000 1000',
					enableBackground: 'new 0 0 1000 1000',
					xmlSpace: 'preserve' },
				_react2.default.createElement(
					'g',
					null,
					_react2.default.createElement('path', {
						d: 'M500,10c13.5,0,25.1,4.8,34.7,14.4C544.2,33.9,549,45.5,549,59v392h392c13.5,0,25.1,4.8,34.7,14.4c9.6,9.6,14.4,21.1,14.4,34.7c0,13.5-4.8,25.1-14.4,34.6c-9.6,9.6-21.1,14.4-34.7,14.4H549v392c0,13.5-4.8,25.1-14.4,34.7c-9.6,9.6-21.1,14.4-34.7,14.4c-13.5,0-25.1-4.8-34.7-14.4c-9.6-9.6-14.4-21.1-14.4-34.7V549H59c-13.5,0-25.1-4.8-34.7-14.4C14.8,525.1,10,513.5,10,500c0-13.5,4.8-25.1,14.4-34.7C33.9,455.8,45.5,451,59,451h392V59c0-13.5,4.8-25.1,14.4-34.7C474.9,14.8,486.5,10,500,10L500,10z'
					})
				)
			);
		}

		/* eslint-enable max-len, no-undef */

	}, {
		key: 'buildButtonContent',
		value: function buildButtonContent() {
			var _props3 = this.props,
			    multiple = _props3.multiple,
			    classNamespace = _props3.classNamespace,
			    disabled = _props3.disabled,
			    classNames = _props3.classNames,
			    styles = _props3.styles,
			    color = _props3.color,
			    disabledColor = _props3.disabledColor,
			    plusElement = _props3.plusElement;


			var pseudobuttonContentStyle = (0, _extends3.default)({
				color: disabled ? disabledColor : color
			}, styles.pseudobuttonContent);

			if (multiple !== false) {
				return _react2.default.createElement(
					'span',
					{
						className: classNames.pseudobuttonContent || classNamespace + 'pseudobuttonContent',
						style: pseudobuttonContentStyle },
					this.buildPlus(disabled, color, disabledColor, plusElement)
				);
			}
			var _state = this.state,
			    imagePreviewUrls = _state.imagePreviewUrls,
			    optimisticPreviews = _state.optimisticPreviews;

			if ((!imagePreviewUrls || imagePreviewUrls.length < 1) && (!optimisticPreviews || optimisticPreviews.length < 1)) {
				return _react2.default.createElement(
					'span',
					{
						className: classNames.pseudobuttonContent || classNamespace + 'pseudobuttonContent',
						style: pseudobuttonContentStyle },
					this.buildPlus(disabled, color, disabledColor, plusElement)
				);
			}
			return this.buildPreviews(imagePreviewUrls, optimisticPreviews, true);
		}
	}, {
		key: 'buildClose',
		value: function buildClose() {
			var _this5 = this;

			var _props4 = this.props,
			    multiple = _props4.multiple,
			    classNamespace = _props4.classNamespace,
			    disabled = _props4.disabled,
			    classNames = _props4.classNames,
			    styles = _props4.styles,
			    color = _props4.color,
			    disabledColor = _props4.disabledColor,
			    borderColor = _props4.borderColor,
			    disabledBorderColor = _props4.disabledBorderColor,
			    deleteElement = _props4.deleteElement;


			if (multiple !== false) {
				return null;
			}
			var imagePreviewUrls = this.state.imagePreviewUrls;

			if (!imagePreviewUrls || imagePreviewUrls.length < 1) {
				return null;
			}

			var deletePreviewStyle = (0, _extends3.default)({
				color: disabled ? disabledColor : color,
				borderColor: disabled ? disabledBorderColor : borderColor
			}, styles.deletePreview || {});

			return _react2.default.createElement(
				'div',
				{
					className: classNames.deletePreview || classNamespace + 'deletePreview',
					style: deletePreviewStyle,
					onClick: function onClick(e) {
						e.preventDefault();
						_this5.deleteImage(0);
					} },
				deleteElement || _react2.default.createElement(
					'svg',
					{ xmlns: 'http://www.w3.org/2000/svg', width: '7.969', height: '8', viewBox: '0 0 7.969 8' },
					_react2.default.createElement('path', {
						id: 'X_Icon',
						'data-name': 'X Icon',
						style: {
							fill: disabled ? disabledColor : color,
							fillRrule: 'evenodd'
						}
						/* eslint-disable max-len */
						, d: 'M562.036,606l2.849-2.863a0.247,0.247,0,0,0,0-.352l-0.7-.706a0.246,0.246,0,0,0-.352,0l-2.849,2.862-2.849-2.862a0.247,0.247,0,0,0-.352,0l-0.7.706a0.249,0.249,0,0,0,0,.352L559.927,606l-2.849,2.862a0.25,0.25,0,0,0,0,.353l0.7,0.706a0.249,0.249,0,0,0,.352,0l2.849-2.862,2.849,2.862a0.249,0.249,0,0,0,.352,0l0.7-.706a0.25,0.25,0,0,0,0-.353Z'
						/* eslint-enable max-len */
						, transform: 'translate(-557 -602)'
					})
				)
			);
		}
	}, {
		key: 'showNotification',
		value: function showNotification() {
			var _props5 = this.props,
			    multiple = _props5.multiple,
			    disabled = _props5.disabled;
			var imagePreviewUrls = this.state.imagePreviewUrls;

			if (!disabled && multiple === false && imagePreviewUrls && imagePreviewUrls.length > 0) {
				this.setState({
					displayNotification: true
				});
			}
		}
	}, {
		key: 'hideNotification',
		value: function hideNotification() {
			var multiple = this.props.multiple;

			if (multiple === false) {
				this.setState({
					displayNotification: false
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _classnames,
			    _this6 = this;

			var _state2 = this.state,
			    imagePreviewUrls = _state2.imagePreviewUrls,
			    loadState = _state2.loadState,
			    optimisticPreviews = _state2.optimisticPreviews;
			var _props6 = this.props,
			    inputId = _props6.inputId,
			    disabled = _props6.disabled,
			    multiple = _props6.multiple,
			    label = _props6.label,
			    size = _props6.size,
			    classNamespace = _props6.classNamespace,
			    classNames = _props6.classNames,
			    styles = _props6.styles,
			    color = _props6.color,
			    disabledColor = _props6.disabledColor,
			    borderColor = _props6.borderColor,
			    disabledBorderColor = _props6.disabledBorderColor;


			var containerClassNames = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, classNames.container || classNamespace + 'container', true), (0, _defineProperty3.default)(_classnames, 'disabled', disabled), _classnames));

			var loadContainerStyle = (0, _extends3.default)({}, size ? {
				width: size,
				height: size
			} : {}, {
				color: disabled ? disabledColor : color
			}, styles.loadContainer || {});

			var pseudobuttonStyle = (0, _extends3.default)({}, size ? {
				width: size,
				height: size
			} : {}, {
				color: disabled ? disabledColor : color
			}, styles.pseudobuttonStyle || {});

			var labelStyle = (0, _extends3.default)({
				color: disabled ? disabledColor : color
			}, styles.label || {});

			var dropzoneStyle = (0, _extends3.default)({
				borderColor: disabled ? disabledBorderColor : borderColor
			}, styles.dropzone || {});

			return _react2.default.createElement(
				'div',
				{ className: containerClassNames, style: styles.container || {} },
				_react2.default.createElement(
					'label',
					{
						className: classNames.label || classNamespace + 'label',
						style: labelStyle,
						htmlFor: inputId || 'filesInput' },
					label || null
				),
				_react2.default.createElement(
					'div',
					{ className: classNames.filesInputContainer || classNamespace + 'filesInputContainer', style: styles.filesInputContainer },
					!this.props.liveUpload && this.state.filesListState.length < this.props.maxImages || this.props.liveUpload && this.state.imagePreviewUrls.length < this.props.maxImages ? [_react2.default.createElement(
						'div',
						{
							key: 1,
							className: classNames.loadContainer || classNamespace + 'loadContainer',
							style: loadContainerStyle },
						this.buildClose(),
						_react2.default.createElement(
							_reactDropzone2.default,
							{
								onDrop: this.handleFileDrop,
								disableClick: true,
								accept: 'image/*',
								className: classNames.dropzone || classNamespace + 'dropzone',
								style: dropzoneStyle,
								multiple:
								/* eslint-disable no-unneeded-ternary */
								multiple === false ? false : true
								/* eslint-enable no-unneeded-ternary */
							},
							_react2.default.createElement(
								_reactProgressButton2.default,
								{
									state: loadState,
									type: 'button',
									classNamespace: classNamespace + 'button-',
									className: classNames.pseudobutton || classNamespace + 'pseudobutton',
									style: pseudobuttonStyle,
									onClick: function onClick(e) {
										e.preventDefault();
										if (_this6.input) {
											_this6.input.click();
										}
									},
									onMouseOver: this.showNotification,
									onMouseLeave: this.hideNotification,
									onDragOver: this.showNotification,
									onDragLeave: this.hideNotification },
								this.buildButtonContent()
							)
						)
					), _react2.default.createElement('input', {
						key: 2,
						name: inputId || 'filesInput',
						id: inputId || 'filesInput',
						className: classNames.fileInput || classNamespace + 'fileInput',
						style: (0, _extends3.default)({
							display: 'none'
						}, styles.fileInput || {}),
						ref: function ref(_ref2) {
							_this6.input = _ref2;
						},
						type: 'file',
						accept: 'image/*',
						multiple: multiple === false ? false : 'multiple',
						disabled: disabled || loadState === 'loading',
						onChange: this.handleImageChange
					})] : null,
					multiple !== false ? this.buildPreviews(imagePreviewUrls, this.props.optimisticPreviews && optimisticPreviews) : null
				)
			);
		}
	}]);
	return ImagesUploader;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'deleteImage', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'deleteImage'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildPreviews', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'buildPreviews'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadImages', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'loadImages'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleImageChange', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleImageChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleFileDrop', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleFileDrop'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildButtonContent', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'buildButtonContent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'buildClose', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'buildClose'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'showNotification', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'showNotification'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hideNotification', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'hideNotification'), _class.prototype)), _class);
ImagesUploader.propTypes = {
	url: _react.PropTypes.string.isRequired,
	dataName: _react.PropTypes.string,
	headers: _react.PropTypes.object,
	classNamespace: _react.PropTypes.string,
	inputId: _react.PropTypes.string,
	label: _react.PropTypes.string,
	images: _react.PropTypes.array,
	maxImages: _react.PropTypes.number,
	disabled: _react.PropTypes.bool,
	onLoadStart: _react.PropTypes.func,
	onLoadEnd: _react.PropTypes.func,
	deleteImage: _react.PropTypes.func,
	optimisticPreviews: _react.PropTypes.bool,
	multiple: _react.PropTypes.bool,
	liveUpload: _react.PropTypes.bool,
	image: _react.PropTypes.string,
	notification: _react.PropTypes.string,
	max: _react.PropTypes.number,
	color: _react.PropTypes.string,
	disabledColor: _react.PropTypes.string,
	borderColor: _react.PropTypes.string,
	disabledBorderColor: _react.PropTypes.string,
	notificationBgColor: _react.PropTypes.string,
	notificationColor: _react.PropTypes.string,
	deleteElement: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	plusElement: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	classNames: _react.PropTypes.shape({
		container: _react.PropTypes.string,
		label: _react.PropTypes.string,
		deletePreview: _react.PropTypes.string,
		loadContainer: _react.PropTypes.string,
		dropzone: _react.PropTypes.string,
		pseudobutton: _react.PropTypes.string,
		pseudobuttonContent: _react.PropTypes.string,
		uploadButton: _react.PropTypes.string,
		imgPreview: _react.PropTypes.string,
		fileInput: _react.PropTypes.string,
		emptyPreview: _react.PropTypes.string,
		filesInputContainer: _react.PropTypes.string,
		notification: _react.PropTypes.string
	}),
	styles: _react.PropTypes.shape({
		container: _react.PropTypes.object,
		label: _react.PropTypes.object,
		deletePreview: _react.PropTypes.object,
		loadContainer: _react.PropTypes.object,
		dropzone: _react.PropTypes.object,
		pseudobutton: _react.PropTypes.object,
		pseudobuttonContent: _react.PropTypes.object,
		imgPreview: _react.PropTypes.object,
		fileInput: _react.PropTypes.object,
		emptyPreview: _react.PropTypes.object,
		filesInputContainer: _react.PropTypes.object,
		notification: _react.PropTypes.object
	})
};
ImagesUploader.defaultProps = {
	dataName: 'imageFiles',
	headers: {},
	classNames: {},
	styles: {},
	multiple: true,
	maxImages: 100,
	liveUpload: true,
	color: '#142434',
	disabledColor: '#bec3c7',
	borderColor: '#a9bac8',
	disabledBorderColor: '#bec3c7',
	notificationBgColor: 'rgba(0, 0, 0, 0.3)',
	notificationColor: '#fafafa',
	classNamespace: 'iu-'
};
exports.default = ImagesUploader;
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(ImagesUploader, 'ImagesUploader', 'src/index.jsx');
}();

;