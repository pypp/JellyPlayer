/** @format */
import { memo } from "react";
import { Blurhash } from "react-blurhash";

import { motion } from "framer-motion";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

import { yellow } from "@mui/material/colors";

import { ErrorBoundary } from "react-error-boundary";

import CarouselSlideError from "../errors/carousel";
import { MdiStar } from "../icons/mdiStar";
import { endsAt, getRuntime } from "../../utils/date/time";
import { useNavigate } from "react-router-dom";
import { MediaTypeIconCollection } from "../utils/iconsCollection";
import { MdiPlayOutline } from "../icons/mdiPlayOutline";
import { MdiChevronRight } from "../icons/mdiChevronRight";
import { MdiHeart } from "../icons/mdiHeart";
import { MdiHeartOutline } from "../icons/mdiHeartOutline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getUserLibraryApi } from "@jellyfin/sdk/lib/utils/api/user-library-api";
import { getUserApi } from "@jellyfin/sdk/lib/utils/api/user-api";
import { useSnackbar } from "notistack";
import LikeButton from "../buttons/likeButton";
import MarkPlayedButton from "../buttons/markPlayedButton";
import { theme } from "../../theme";

const CarouselSlide = ({ item }) => {
	const navigate = useNavigate();

	const user = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			let usr = await getUserApi(window.api).getCurrentUser();
			return usr.data;
		},
		networkMode: "always",
	});

	// consoe;

	// const favouriteButtonMutation =

	return (
		<ErrorBoundary fallback={<CarouselSlideError itemName={item.Name} />}>
			<Paper
				className="hero-carousel-slide"
				sx={{
					background: "transparent",
					px: 3,
				}}
			>
				<div className="hero-carousel-background-container">
					{!!item.ImageBlurHashes.Backdrop &&
						Object.keys(item.ImageBlurHashes.Backdrop)
							.length != 0 && (
							<Blurhash
								hash={
									item.ImageBlurHashes.Backdrop[
										Object.keys(
											item.ImageBlurHashes
												.Backdrop,
										)[0]
									]
								}
								// hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
								width="1080"
								height="720"
								resolutionX={64}
								resolutionY={96}
								className="hero-carousel-background-blurhash"
								punch={1}
							/>
						)}
					<div
						className="hero-carousel-background-image"
						style={{
							backgroundImage: !!item.ParentBackdropItemId
								? `url('${window.api.basePath}/Items/${item.ParentBackdropItemId}/Images/Backdrop')`
								: `url('${window.api.basePath}/Items/${item.Id}/Images/Backdrop')`,
						}}
					></div>
					<div className="hero-carousel-background-icon-container">
						{MediaTypeIconCollection[item.Type]}
					</div>
				</div>
				<Box className="hero-carousel-detail">
					<Typography
						component={motion.h2}
						key={item.Id}
						variant="h2"
						className="hero-carousel-text"
						sx={{
							mb: 2.5,
						}}
						initial={{
							y: 10,
							opacity: 0,
						}}
						exit={{
							y: 10,
							opacity: 0,
						}}
						transition={{
							duration: 0.35,
						}}
						whileInView={{
							y: 0,
							opacity: 1,
						}}
						overflow="visible"
					>
						{!item.ImageTags.Logo ? (
							item.Name
						) : (
							<img
								className="hero-carousel-text-logo"
								src={
									window.api.basePath +
									"/Items/" +
									item.Id +
									"/Images/Logo?quality=80&tag=" +
									item.ImageTags.Logo
								}
							></img>
						)}
					</Typography>
					<Stack
						component={motion.div}
						direction="row"
						gap={1}
						initial={{
							y: 10,
							opacity: 0,
						}}
						transition={{
							duration: 0.25,
							delay: 0.1,
						}}
						exit={{
							y: 10,
							opacity: 0,
						}}
						whileInView={{
							y: 0,
							opacity: 1,
						}}
						divider={
							<Box
								sx={{
									width: "4px",
									height: "4px",
									background: "white",
									alignSelf: "center",
									aspectRatio: 1,
									borderRadius: "10px",
								}}
							></Box>
						}
						className="hero-carousel-info"
					>
						<Typography variant="subtitle1">
							{!!item.ProductionYear
								? item.ProductionYear
								: "Unknown"}
						</Typography>
						<Chip
							variant="filled"
							label={item.OfficialRating ?? "Not Rated"}
						/>
						<Box
							sx={{
								display: "flex",
								gap: "0.25em",
								alignItems: "center",
							}}
							className="hero-carousel-info-rating"
						>
							{!!item.CommunityRating ? (
								<>
									<MdiStar
										sx={{
											color: yellow[700],
										}}
									/>
									<Typography variant="subtitle1">
										{Math.round(
											item.CommunityRating *
												10,
										) / 10}
									</Typography>
								</>
							) : (
								<Typography variant="subtitle1">
									No Community Rating
								</Typography>
							)}
						</Box>
						{!!item.RunTimeTicks && (
							<Typography variant="subtitle1">
								{getRuntime(item.RunTimeTicks)}
							</Typography>
						)}
						{!!item.RunTimeTicks && (
							<Typography variant="subtitle1">
								{endsAt(item.RunTimeTicks)}
							</Typography>
						)}
					</Stack>
					<Typography
						component={motion.div}
						initial={{
							y: 10,
							opacity: 0,
						}}
						transition={{
							duration: 0.25,
							delay: 0.2,
						}}
						whileInView={{
							y: 0,
							opacity: 0.7,
						}}
						exit={{
							y: 10,
							opacity: 0,
						}}
						variant="subtitle1"
						className="hero-carousel-text"
						sx={{
							display: "-webkit-box",
							maxWidth: "70%",
							maxHeight: "30%",
							textOverflow: "ellipsis",
							overflow: "hidden",
							WebkitLineClamp: "4",
							WebkitBoxOrient: "vertical",
						}}
					>
						{item.Overview}
					</Typography>

					{/* TODO Link PLay and More info buttons in carousel */}
					<Stack
						component={motion.div}
						initial={{
							y: 10,
							opacity: 0,
						}}
						transition={{
							duration: 0.25,
							delay: 0.4,
						}}
						whileInView={{
							y: 0,
							opacity: 1,
						}}
						exit={{
							y: 10,
							opacity: 0,
						}}
						mt={3}
						direction="row"
						gap={3}
						width="100%"
						className="hero-carousel-button-container"
						alignItems="center"
					>
						<Stack
							direction="row"
							gap="1em"
							alignItems="center"
							justifyContent="center"
						>
							<Button
								variant="contained"
								size="large"
								disabled
								startIcon={
									<MdiPlayOutline
										sx={{ fontSize: "1.4em" }}
									/>
								}
								sx={{
									textTransform: "none !important",
								}}
							>
								{item.UserData.PlaybackPositionTicks >
								0 ? (
									<Stack
										direction="column"
										gap="0.2em"
										alignItems="flex-start"
										justifyContent="center"
									>
										Resume
									</Stack>
								) : (
									"Play"
								)}
							</Button>
						</Stack>

						<Button
							size="large"
							color="white"
							variant="outlined"
							endIcon={<MdiChevronRight />}
							onClick={() => navigate(`/item/${item.Id}`)}
						>
							More info
						</Button>
						<Stack direction="row" gap={1}>
							<LikeButton
								itemId={item.Id}
								queryKey={["home", "latestMedia"]}
								userId={user.data.Id}
								isFavorite={item.UserData.IsFavorite}
								itemName={item.Name}
							/>
							<MarkPlayedButton
								itemId={item.Id}
								queryKey={["home", "latestMedia"]}
								userId={user.data.Id}
								isPlayed={item.UserData.Played}
								itemName={item.Name}
							/>
						</Stack>
					</Stack>
				</Box>
			</Paper>
		</ErrorBoundary>
	);
};

export default memo(CarouselSlide);