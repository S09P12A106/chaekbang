package com.jsix.chaekbang.domain.meeting.application;


import com.jsix.chaekbang.domain.meeting.application.repository.ConnectUserRepository;
import com.jsix.chaekbang.domain.meeting.application.repository.VoteRepository;
import com.jsix.chaekbang.domain.meeting.domain.Vote;
import com.jsix.chaekbang.domain.meeting.domain.ConnectUser;
import com.jsix.chaekbang.domain.meeting.dto.socket.CreateVoteRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.socket.SendVoteRequestDto;
import com.jsix.chaekbang.domain.meeting.dto.socket.VoteResponseDto;
import com.jsix.chaekbang.global.config.stomp.SocketAuthUser;
import com.jsix.chaekbang.global.exception.NotFoundResourceException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VoteUseCase {

    private final VoteRepository voteRepository;
    private final ConnectUserRepository connectUserRepository;

    @Transactional
    public void createVote(CreateVoteRequestDto dto,
        Long userId, Long meetingId) {
        Vote vote = dto.toEntity(userId, meetingId);
        voteRepository.save(vote);
    }

    public List<VoteResponseDto> findAllByMeetingId(Long meetingId) {
        List<Vote> votes = voteRepository.findAllByMeetingId(meetingId);
        return votes.stream().map(VoteResponseDto::from)
            .collect(Collectors.toList());
    }

    public void vote(SendVoteRequestDto dto, SocketAuthUser authUser) {
        Vote vote = findVoteById(dto.getVoteId());
        ConnectUser connectUser = connectUserRepository.findBySessionId(authUser.getSessionId())
            .orElseThrow(() -> new NotFoundResourceException("해당 커넥션 정보를 찾을 수 없습니다."));

        vote.vote(connectUser, dto.getSelectedItemIndex());
        voteRepository.save(vote);
    }

    public void closeVote(String voteId, SocketAuthUser authUser) {
        Vote vote = findVoteById(voteId);
        vote.close(authUser.getUserId());
        voteRepository.save(vote);
    }


    private Vote findVoteById(String voteId) {
        return voteRepository.findById(voteId)
            .orElseThrow(() -> new NotFoundResourceException("해당 투표를 찾을 수 없습니다."));
    }
}
