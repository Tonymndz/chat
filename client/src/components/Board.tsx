import './Board.css';

import {
	AnimationTypes,
	IAnimation,
	IChatMessage,
	IEmoji,
	IFigure,
	IGifs,
	IUserLocations,
	IUserProfiles
} from '../types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IMusicNoteProps, MusicNote } from './MusicNote';

import { Gif } from '@giphy/react-components';
import React from 'react';
import { UserCursors } from './UserCursors';
import gryphon from '../assets/gryphon_walk.gif';

interface IBoardProps {
	musicNotes: IMusicNoteProps[];
	updateNotes: (notes: IMusicNoteProps[]) => void;
	emojis: IEmoji[];
	updateEmojis: (emojis: IEmoji[]) => void;
	gifs: IGifs[];
	updateGifs: (gifs: IGifs[]) => void;
	chatMessages: IChatMessage[];
	updateChatMessages: (chatMessages: IChatMessage[]) => void;
	figures: IFigure[];
	updateFigures: (figures: IFigure[]) => void;
	userLocations: IUserLocations;
	userProfiles: IUserProfiles;
	animations: IAnimation[];
	updateAnimations: (animations: IAnimation[]) => void;
}

export const Board = ({
	musicNotes,
	updateNotes,
	emojis,
	updateEmojis,
	gifs,
	updateGifs,
	chatMessages,
	updateChatMessages,
	userLocations,
	userProfiles,
	figures,
	updateFigures,
	animations,
	updateAnimations
}: IBoardProps) => {
	return (
		<div className="board-container">
			<TransitionGroup>
				{emojis.map((emoji) => (
					<CSSTransition
						key={emoji.key}
						timeout={1000}
						classNames="note-transition"
						onEntered={() => {
							const index = emojis.findIndex(
								(_emoji) => _emoji.key === emoji.key
							);
							updateEmojis([
								...emojis.slice(0, index),
								...emojis.slice(index + 1)
							]);
						}}
					>
						<div
							style={{
								width: 40,
								height: 40,
								top: emoji.top,
								left: emoji.left,
								position: 'absolute',
								zIndex: 9999999,
								userSelect: 'none'
							}}
						>
							{emoji.type}
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>

			<TransitionGroup>
				{musicNotes.map((note) => (
					<CSSTransition
						key={note.key}
						timeout={1000}
						classNames="note-transition"
						onEntered={() => {
							const noteIndex = musicNotes.findIndex(
								(_note) => _note.key === note.key
							);
							updateNotes([
								...musicNotes.slice(0, noteIndex),
								...musicNotes.slice(noteIndex + 1)
							]);
						}}
					>
						<MusicNote {...note} />
					</CSSTransition>
				))}
			</TransitionGroup>

			<TransitionGroup>
				{chatMessages.map((message) => (
					<CSSTransition
						key={message.key}
						timeout={7000}
						classNames="message-transition"
						onEntered={() => {
							const index = chatMessages.findIndex(
								(msg) => msg.key === message.key
							);
							updateChatMessages([
								...chatMessages.slice(0, index),
								...chatMessages.slice(index + 1)
							]);
						}}
					>
						<div
							className="board-message"
							style={
								message.isCentered
									? {
											width: window.innerWidth,
											textAlign: 'center',
											left: 0,
											right: 0,
											top: message.top,
											maxWidth: 'none',
											userSelect: 'auto'
									  }
									: {
											top: message.top,
											left: message.left
									  }
							}
						>
							{message.value}
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>

			<TransitionGroup>
				{gifs.map((gif) => (
					<CSSTransition
						key={gif.key}
						timeout={5000}
						classNames="gif-transition"
						onEntered={() => {
							const index = gifs.findIndex((_gif) => _gif.key === gif.key);
							updateGifs([...gifs.slice(0, index), ...gifs.slice(index + 1)]);
						}}
					>
						<div
							style={{
								top: gif.top,
								left: gif.left,
								position: 'absolute',
								zIndex: 9999998,
								userSelect: 'none'
							}}
						>
							<Gif gif={gif.data} width={180} noLink={true} />
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>

			<TransitionGroup>
				{figures.map((figure) => (
					<CSSTransition
						key={figure.key}
						timeout={10000}
						classNames="figure-transition"
						onEntered={() => {
							const index = figures.findIndex(
								(_figure) => _figure.key === figure.key
							);
							updateFigures([
								...figures.slice(0, index),
								...figures.slice(index + 1)
							]);
						}}
					>
						<div
							style={{
								top: window.innerHeight / 2 - 30,
								left: 0,
								position: 'absolute',
								zIndex: 9999998,
								userSelect: 'none'
							}}
						>
							<img src={gryphon} style={{ width: 100 }} alt="gryphon" />
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>

			<TransitionGroup>
				{animations.map((animation) => (
					<CSSTransition
						key={animation.type}
						timeout={5000}
						classNames="animation-transition"
						onEntered={() => {
							const index = animations.findIndex(
								(_animation) => _animation.type === animation.type
							);
							updateAnimations([
								...animations.slice(0, index),
								...animations.slice(index + 1)
							]);
						}}
					>
						<Animation {...animation} />
					</CSSTransition>
				))}
			</TransitionGroup>

			<UserCursors userLocations={userLocations} userProfiles={userProfiles} />
		</div>
	);
};

interface IAnimationProps {
	type: AnimationTypes;
}

const Animation = ({ type }: IAnimationProps) => {
	if (type === 'start game') {
		return (
			<div
				style={{
					width: window.innerWidth,
					textAlign: 'center',
					left: 0,
					right: 0,
					top: '20vh',
					userSelect: 'none',
					position: 'absolute',
					fontSize: '2em'
				}}
			>
				starting tower defense!
			</div>
		);
	}

	if (type === 'info') {
		return (
			<div
				style={{
					width: window.innerWidth,
					textAlign: 'center',
					left: 0,
					right: 0,
					top: '30vh',
					userSelect: 'none',
					position: 'absolute',
					fontSize: '1.8em'
				}}
			>
				place your tower to defend yourself
			</div>
		);
	}

	if (type === 'end game') {
		return (
			<div
				style={{
					width: window.innerWidth,
					textAlign: 'center',
					left: 0,
					right: 0,
					top: '20vh',
					userSelect: 'none',
					position: 'absolute',
					fontSize: '2em'
				}}
			>
				finished tower defense
			</div>
		);
	}

	return null;
};
